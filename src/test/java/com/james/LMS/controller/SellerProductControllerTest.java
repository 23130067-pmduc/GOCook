package com.james.LMS.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.james.LMS.config.SecurityConfig;
import com.james.LMS.config.SecurityUserDetails;
import com.james.LMS.exception.SellerProductException;
import com.james.LMS.service.SellerProductService;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.FilterType;
import org.springframework.context.annotation.Import;
import org.springframework.http.HttpStatus;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(
    controllers = SellerProductController.class,
    excludeFilters =
        @ComponentScan.Filter(type = FilterType.ASSIGNABLE_TYPE, classes = SecurityConfig.class))
@Import(SellerProductControllerTest.Security.class)
class SellerProductControllerTest {
  @Autowired MockMvc mvc;
  @MockitoBean SellerProductService service;
  static final String VALID =
      """
      {"name":"Menu","category":"Món chay","unitPrice":"150000.00","minGuests":2,"maxGuests":8,
      "dishItems":"Canh rau","status":"DRAFT","imageKeys":[],"coverKey":"","sellerId":999}
      """;

  SecurityUserDetails chef() {
    return SecurityUserDetails.builder()
        .id(42L)
        .email("chef@example.invalid")
        .authorities(List.of(new SimpleGrantedAuthority("ROLE_INSTRUCTOR")))
        .build();
  }

  @Test
  void requiresAuthenticationAndChefRole() throws Exception {
    mvc.perform(get("/api/seller/products")).andExpect(status().isUnauthorized());
    mvc.perform(
            get("/api/seller/products")
                .with(
                    user(
                        SecurityUserDetails.builder()
                            .id(43L)
                            .email("customer@example.invalid")
                            .authorities(List.of(new SimpleGrantedAuthority("ROLE_USER")))
                            .build())))
        .andExpect(status().isForbidden());
    verifyNoInteractions(service);
  }

  @Test
  void derivesOwnershipFromPrincipalRatherThanPayload() throws Exception {
    mvc.perform(
            multipart("/api/seller/products")
                .file(
                    new MockMultipartFile(
                        "menu",
                        "",
                        "application/json",
                        VALID.getBytes(java.nio.charset.StandardCharsets.UTF_8)))
                .with(user(chef())))
        .andExpect(status().isCreated());
    verify(service).create(eq(42L), any(), any());
  }

  @Test
  void invalidPriceDoesNotReachService() throws Exception {
    mvc.perform(
            multipart("/api/seller/products")
                .file(
                    new MockMultipartFile(
                        "menu",
                        "",
                        "application/json",
                        VALID
                            .replace("150000.00", "-1")
                            .getBytes(java.nio.charset.StandardCharsets.UTF_8)))
                .with(user(chef())))
        .andExpect(status().isBadRequest());
    verifyNoInteractions(service);
  }

  @Test
  void missingOrForeignMenuReturns404() throws Exception {
    when(service.get(42L, 99L))
        .thenThrow(
            new SellerProductException(
                HttpStatus.NOT_FOUND, "MENU_NOT_FOUND", "Không tìm thấy thực đơn của bạn."));
    mvc.perform(get("/api/seller/products/99").with(user(chef()))).andExpect(status().isNotFound());
  }

  @TestConfiguration
  @EnableMethodSecurity
  static class Security {
    @Bean
    SecurityFilterChain chain(HttpSecurity http) throws Exception {
      return http.csrf(csrf -> csrf.disable())
          .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
          .httpBasic(Customizer.withDefaults())
          .build();
    }
  }
}
