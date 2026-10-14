package com.james.LMS.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.james.LMS.admin.service.AdminProductService;
import com.james.LMS.entity.User;
import com.james.LMS.enums.ProductStatus;
import com.james.LMS.exception.SellerProductException;
import com.james.LMS.repository.ProductImageRepository;
import com.james.LMS.repository.ProductRepository;
import com.james.LMS.repository.UserRepository;
import com.james.LMS.request.SellerProductRequest;
import com.james.LMS.request.SellerProductStatusRequest;
import com.james.LMS.response.SellerProductResponse;
import com.james.LMS.service.impl.ProductImageCleanupService;
import com.james.LMS.service.impl.SellerProductServiceImpl;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.condition.EnabledIfEnvironmentVariable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.context.transaction.TestTransaction;

@DataJpaTest(
    properties = {
      "spring.datasource.url=${GOCOOK_MENU_TEST_URL}",
      "spring.datasource.username=app_user",
      "spring.datasource.password=${GOCOOK_MENU_TEST_PASSWORD:app_password}",
      "spring.jpa.hibernate.ddl-auto=none",
      "spring.jpa.show-sql=false"
    })
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import({
  SellerProductServiceImpl.class,
  AdminProductService.class,
  ProductImageCleanupService.class
})
@EnabledIfEnvironmentVariable(named = "GOCOOK_MENU_TEST_URL", matches = ".+gocook_menu_test_.+")
class SellerProductPersistenceTest {
  @Autowired SellerProductService service;
  @Autowired UserRepository users;
  @Autowired ProductRepository products;
  @Autowired ProductImageRepository images;
  @MockitoBean CloudinaryService cloudinary;
  @Autowired AdminProductService admin;
  @Autowired TestEntityManager entityManager;
  Long chef;
  Long other;
  final MockMultipartFile photo =
      new MockMultipartFile(
          "files", "dish.png", "image/png", new byte[] {(byte) 137, 80, 78, 71, 13, 10, 26, 10});

  @BeforeEach
  void setup() {
    chef = user();
    other = user();
    when(cloudinary.uploadMenuImage(any()))
        .thenAnswer(
            invocation -> {
              String id = "gocook/menus/" + UUID.randomUUID();
              return new CloudinaryService.MenuImage(
                  "https://res.cloudinary.com/demo/image/upload/" + id + ".png", id);
            });
  }

  Long user() {
    return users
        .saveAndFlush(
            User.builder()
                .username("menu-test")
                .email(UUID.randomUUID() + "@example.invalid")
                .password("not-a-login-password")
                .build())
        .getId();
  }

  SellerProductRequest request(
      Long version, ProductStatus status, List<String> keys, String cover) {
    return new SellerProductRequest(
        "Test menu",
        "Món chay",
        new BigDecimal("150000.00"),
        2,
        8,
        "Canh rau\nĐậu hũ",
        "Menu test",
        status,
        version,
        keys,
        cover);
  }

  SellerProductResponse create() {
    return service.create(
        chef,
        request(null, ProductStatus.PUBLISHED, List.of("new:0", "new:1"), "new:0"),
        List.of(photo, photo));
  }

  @Test
  void persistsOwnedMenuAndMultipleImagesWithOneCover() {
    var menu = create();
    assertThat(service.get(chef, menu.id()).images()).hasSize(2);
    assertThat(menu.images().stream().filter(SellerProductResponse.Image::isCover)).hasSize(1);
    assertThat(products.findById(menu.id()).orElseThrow().getSellerId()).isEqualTo(chef);
    assertThat(menu.imageUrl()).isEqualTo(menu.images().getFirst().url());
    assertThat(service.search(other, "", "", null, 0, 10).getTotalElements()).isZero();
    assertThat(
            service
                .search(chef, "Test", "Món chay", ProductStatus.PUBLISHED, 0, 10)
                .getTotalElements())
        .isEqualTo(1);
  }

  @Test
  void blocksReadingAndUpdatingAnotherChefsMenu() {
    var menu = create();
    assertThatThrownBy(() -> service.get(other, menu.id()))
        .isInstanceOf(SellerProductException.class)
        .hasMessageContaining("Không tìm thấy");
    assertThatThrownBy(
            () ->
                service.update(
                    other,
                    menu.id(),
                    request(menu.version(), ProductStatus.DRAFT, List.of(), ""),
                    List.of()))
        .isInstanceOf(SellerProductException.class);
  }

  @Test
  void swapsCoverAndOrderWithoutBreakingUniqueIndexOrLosingVersion() {
    var menu = create();
    String a = "existing:" + menu.images().get(0).id();
    String b = "existing:" + menu.images().get(1).id();
    var changed =
        service.update(
            chef,
            menu.id(),
            request(menu.version(), ProductStatus.PUBLISHED, List.of(b, a), b),
            List.of());
    assertThat(changed.images().getFirst().id()).isEqualTo(menu.images().get(1).id());
    assertThat(changed.imageUrl()).isEqualTo(menu.images().get(1).url());
    assertThat(changed.version()).isGreaterThan(menu.version());
    assertThatThrownBy(
            () ->
                service.update(
                    chef,
                    menu.id(),
                    request(menu.version(), ProductStatus.PUBLISHED, List.of(a, b), a),
                    List.of()))
        .isInstanceOf(SellerProductException.class)
        .hasMessageContaining("phiên khác");
  }

  @Test
  void hidingPreservesImagesAndCanBeRepublished() {
    var menu = create();
    var hidden =
        service.changeStatus(
            chef, menu.id(), new SellerProductStatusRequest(ProductStatus.HIDDEN, menu.version()));
    assertThat(hidden.images()).hasSize(2);
    assertThat(hidden.status()).isEqualTo(ProductStatus.HIDDEN);
    assertThat(
            service
                .changeStatus(
                    chef,
                    menu.id(),
                    new SellerProductStatusRequest(ProductStatus.PUBLISHED, hidden.version()))
                .status())
        .isEqualTo(ProductStatus.PUBLISHED);
    verify(cloudinary, never()).deleteMenuImage(any());
  }

  @Test
  void rejectsForeignImageIdsAndFilesDisguisedAsImages() {
    var menu = create();
    assertThatThrownBy(
            () ->
                service.update(
                    chef,
                    menu.id(),
                    request(
                        menu.version(),
                        ProductStatus.PUBLISHED,
                        List.of("existing:999999999"),
                        "existing:999999999"),
                    List.of()))
        .isInstanceOf(SellerProductException.class);
    var executable =
        new MockMultipartFile("files", "fake.png", "image/png", "not-an-image".getBytes());
    assertThatThrownBy(
            () ->
                service.create(
                    chef,
                    request(null, ProductStatus.PUBLISHED, List.of("new:0"), "new:0"),
                    List.of(executable)))
        .isInstanceOf(SellerProductException.class)
        .hasMessageContaining("nội dung ảnh");
  }

  @Test
  void rejectsPublishedMenuWithoutCoverAndExcessiveImages() {
    assertThatThrownBy(
            () ->
                service.create(
                    chef, request(null, ProductStatus.PUBLISHED, List.of(), ""), List.of()))
        .isInstanceOf(SellerProductException.class)
        .hasMessageContaining("ít nhất một ảnh");
    assertThatThrownBy(
            () ->
                service.create(
                    chef,
                    request(null, ProductStatus.DRAFT, List.of("new:0", "new:0"), "new:0"),
                    List.of(photo)))
        .isInstanceOf(SellerProductException.class);
  }

  @Test
  void removesCloudinaryImagesOnlyAfterCommitAndRetainsInactiveMetadata() {
    var menu = create();
    String removedPublicId = images.findForProduct(menu.id()).get(0).getCloudinaryPublicId();
    String retained = "existing:" + menu.images().get(1).id();
    var changed =
        service.update(
            chef,
            menu.id(),
            request(menu.version(), ProductStatus.PUBLISHED, List.of(retained), retained),
            List.of());
    assertThat(changed.images()).hasSize(1);
    verify(cloudinary, never()).deleteMenuImage(removedPublicId);
    TestTransaction.flagForCommit();
    TestTransaction.end();
    verify(cloudinary).deleteMenuImage(removedPublicId);
    assertThat(
            images.findForProduct(menu.id()).stream()
                .filter(image -> !image.isActive())
                .findFirst()
                .orElseThrow()
                .getCloudinaryPublicId())
        .isNull();
  }

  @Test
  void compensatesNewUploadsWhenTransactionRollsBack() {
    when(cloudinary.uploadMenuImage(any()))
        .thenReturn(
            new CloudinaryService.MenuImage(
                "https://res.cloudinary.com/demo/image/upload/a.png", "gocook/menus/rollback"))
        .thenThrow(new IllegalStateException("gateway unavailable"));
    assertThatThrownBy(this::create).isInstanceOf(IllegalStateException.class);
    TestTransaction.flagForRollback();
    TestTransaction.end();
    verify(cloudinary).deleteMenuImage("gocook/menus/rollback");
  }

  @Test
  void doesNotRollBackCommittedMenuWhenRemoteDeletionNeedsRetry() {
    var menu = create();
    String retained = "existing:" + menu.images().get(1).id();
    doThrow(new IllegalStateException("offline")).when(cloudinary).deleteMenuImage(any());
    service.update(
        chef,
        menu.id(),
        request(menu.version(), ProductStatus.PUBLISHED, List.of(retained), retained),
        List.of());
    TestTransaction.flagForCommit();
    TestTransaction.end();
    assertThat(products.findById(menu.id())).isPresent();
    assertThat(images.findForProduct(menu.id()).stream().filter(image -> !image.isActive()))
        .hasSize(1);
  }

  @Test
  void legacyAdminMenusRemainUnassignedAndDoNotLeakIntoChefLists() {
    var legacy =
        admin.create(
            "Legacy menu",
            "Khác",
            BigDecimal.TEN,
            2,
            8,
            "Canh",
            "Demo",
            "/assets/meal.png",
            ProductStatus.PUBLISHED);
    assertThat(legacy.getSellerId()).isNull();
    assertThat(service.search(chef, "", "", null, 0, 10).getTotalElements()).isZero();
    admin.update(
        legacy.getId(),
        "Admin changed",
        "Khác",
        BigDecimal.TEN,
        2,
        8,
        "Canh",
        "Demo",
        "/assets/meal.png",
        ProductStatus.HIDDEN);
    assertThat(admin.get(legacy.getId()).getName()).isEqualTo("Admin changed");
  }

  @Test
  void inactiveChefCannotUseMenuApi() {
    entityManager
        .getEntityManager()
        .createNativeQuery("update users set is_active=false where id=:id")
        .setParameter("id", chef)
        .executeUpdate();
    entityManager.clear();
    assertThatThrownBy(() -> service.search(chef, "", "", null, 0, 10))
        .isInstanceOf(SellerProductException.class)
        .hasMessageContaining("Tài khoản");
  }

  @Test
  void concurrentUpdatesWithTheSameVersionHaveExactlyOneWinner() throws Exception {
    var menu = create();
    String a = "existing:" + menu.images().get(0).id();
    String b = "existing:" + menu.images().get(1).id();
    TestTransaction.flagForCommit();
    TestTransaction.end();
    var start = new CountDownLatch(1);
    var pool = Executors.newFixedThreadPool(2);
    try {
      java.util.concurrent.Callable<String> task =
          () -> {
            start.await();
            try {
              service.update(
                  chef,
                  menu.id(),
                  request(menu.version(), ProductStatus.PUBLISHED, List.of(b, a), b),
                  List.of());
              return "saved";
            } catch (SellerProductException error) {
              return error.getCode();
            }
          };
      var first = pool.submit(task);
      var second = pool.submit(task);
      start.countDown();
      assertThat(List.of(first.get(15, TimeUnit.SECONDS), second.get(15, TimeUnit.SECONDS)))
          .containsExactlyInAnyOrder("saved", "MENU_VERSION_CONFLICT");
    } finally {
      pool.shutdownNow();
    }
  }
}
