<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Khám phá đầu bếp.">
    <title>Khám phá đầu bếp | GO Cook</title>
    <link rel="icon" href="${pageContext.request.contextPath}/assets/favicon.svg" type="image/svg+xml">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
  </head>
  <body>
    <a class="skip" href="#main">Đến nội dung chính</a>
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="${pageContext.request.contextPath}/" aria-label="GO Cook — Trang chủ">
          <span class="brand-mark">
            <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
              <path d="M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7z"></path>
              <path d="M7 16h10M10 11v2m4-2v2"></path>
            </svg>
          </span>
          <span>
            <span class="brand-name">GO Cook</span>
            <small>ĐẦU BẾP TẠI GIA</small>
          </span>
        </a>
        <nav class="nav" aria-label="Điều hướng chính">
          <a href="${pageContext.request.contextPath}/chefs" aria-current="page">Khám phá đầu bếp</a>
          <a href="${pageContext.request.contextPath}/menus">Thực đơn</a>
          <a href="${pageContext.request.contextPath}/request">Tạo yêu cầu</a>
          <a href="${pageContext.request.contextPath}/offers">Ưu đãi</a>
          <a href="${pageContext.request.contextPath}/help">Trợ giúp</a>
        </nav>
        <div class="header-actions">
          <a class="icon-link" href="${pageContext.request.contextPath}/cart" aria-label="Giỏ hàng">
            <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
              <path d="M3 3h2l3 12h10l3-9H6"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="18" cy="20" r="1"></circle>
            </svg>
          </a>
          <a class="login-link text-link small" href="${pageContext.request.contextPath}/login">Đăng nhập</a>
          <a class="btn sm" href="${pageContext.request.contextPath}/chefs">Đặt đầu bếp</a>
          <details class="mobile-menu">
            <summary aria-label="Mở menu">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </summary>
            <nav aria-label="Điều hướng di động">
              <a href="${pageContext.request.contextPath}/chefs" aria-current="page">Khám phá đầu bếp</a>
              <a href="${pageContext.request.contextPath}/menus">Thực đơn</a>
              <a href="${pageContext.request.contextPath}/request">Tạo yêu cầu</a>
              <a href="${pageContext.request.contextPath}/offers">Ưu đãi</a>
              <a href="${pageContext.request.contextPath}/help">Trợ giúp</a>
              <a href="${pageContext.request.contextPath}/account">Tài khoản</a>
              <a href="${pageContext.request.contextPath}/login">Đăng nhập</a>
              <a href="${pageContext.request.contextPath}/pages">Tất cả màn hình</a>
            </nav>
          </details>
        </div>
      </div>
    </header>
    <main id="main">
      <div class="container">
        <div class="page-heading">
          <nav class="breadcrumb" aria-label="Đường dẫn">
            <a href="${pageContext.request.contextPath}/">Trang chủ</a>
            <span>/</span>
            <span>Đầu bếp cho bữa cơm nhà bạn</span>
          </nav>
          <h1>Đầu bếp cho bữa cơm nhà bạn</h1>
          <p class="lead">Khám phá gian bếp, thực đơn và câu chuyện của những người yêu nấu ăn.</p>
        </div>
        <div class="workspace">
          <aside class="card filter">
            <h3>Tìm đầu bếp</h3>
            <label class="field" for="shop-search">Tên gian bếp<input id="shop-search" name="shop-search" type="text" value="" placeholder="Bếp Cô Mai...">
            </label>
            <fieldset>
              <legend>Khu vực</legend>
              <label class="check">
                <input type="checkbox" name="binh-thanh">
                <span>Bình Thạnh</span>
              </label>
              <label class="check">
                <input type="checkbox" name="phu-nhuan">
                <span>Phú Nhuận</span>
              </label>
              <label class="check">
                <input type="checkbox" name="thu-duc">
                <span>Thủ Đức</span>
              </label>
            </fieldset>
            <fieldset>
              <legend>Sở trường</legend>
              <label class="check">
                <input type="checkbox" name="southern">
                <span>Ẩm thực miền Nam</span>
              </label>
              <label class="check">
                <input type="checkbox" name="vegan">
                <span>Món chay</span>
              </label>
              <label class="check">
                <input type="checkbox" name="party">
                <span>Tiệc gia đình</span>
              </label>
            </fieldset>
            <label class="field" for="price">Giá phục vụ<select id="price" name="price">
                <option>Tất cả mức giá</option>
                <option>Dưới 150.000đ/người</option>
                <option>Từ 150.000đ/người</option>
              </select>
            </label>
            <button class="btn full" type="button" data-action="search-shop" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Tìm gian bếp</button>
          </aside>
          <section class="stack">
            <div class="between">
              <h3>Đầu bếp gợi ý</h3>
              <span class="badge gray">TP. Hồ Chí Minh</span>
            </div>
            <article class="card chef-card">
              <img class="" src="${pageContext.request.contextPath}/assets/chef.png" alt="Ảnh minh họa đầu bếp nấu ăn tại nhà" loading="lazy">
              <div class="card-body">
                <div class="between">
                  <span class="badge ">Đầu bếp nổi bật</span>
                  <span class="small amber">★ 4,9 <span class="muted">(186 đánh giá)</span>
                  </span>
                </div>
                <div>
                  <h3>Bếp Cô Mai</h3>
                  <p class="small muted">Nguyễn Thị Mai · 12 năm kinh nghiệm</p>
                </div>
                <p class="small">Chăm chút hương vị miền Nam, từ nồi cá kho đến bát canh chua quen thuộc.</p>
                <div class="row small muted">
                  <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                    <path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0z"></path>
                    <circle cx="12" cy="10" r="2"></circle>
                  </svg> Bình Thạnh · Phú Nhuận <span class="badge gray">Có lịch trống</span>
                </div>
                <div class="between">
                  <span class="price">120.000đ<small> / người</small>
                  </span>
                  <a class="btn sm" href="${pageContext.request.contextPath}/chef-detail">Xem gian bếp</a>
                </div>
              </div>
            </article>
            <article class="card chef-card">
              <div class="initial-portrait" aria-label="Ảnh đầu bếp chưa cập nhật">AN</div>
              <div class="card-body">
                <div class="between">
                  <span class="badge ">Chuyên món chay</span>
                  <span class="small amber">★ 4,8 <span class="muted">(64 đánh giá)</span>
                  </span>
                </div>
                <div>
                  <h3>Bếp An Nhiên</h3>
                  <p class="small muted">Bếp chay gia đình · 6 năm kinh nghiệm</p>
                </div>
                <p class="small">Thực đơn rau củ theo mùa, nhẹ nhàng và cân bằng.</p>
                <div class="row small muted">
                  <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                    <path d="M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0z"></path>
                    <circle cx="12" cy="10" r="2"></circle>
                  </svg> Bình Thạnh · Phú Nhuận <span class="badge gray">Có lịch trống</span>
                </div>
                <div class="between">
                  <span class="price">105.000đ<small> / người</small>
                  </span>
                  <a class="btn sm" href="${pageContext.request.contextPath}/chef-an-nhien">Xem gian bếp</a>
                </div>
              </div>
            </article>
            <div class="notice">Chưa biết chọn ai? <a class="text-link" href="${pageContext.request.contextPath}/matching">Gợi ý đầu bếp theo nhu cầu →</a>
            </div>
          </section>
        </div>
      </div>
    </main>
    <footer class="site-footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <a class="brand" href="${pageContext.request.contextPath}/" aria-label="GO Cook — Trang chủ">
              <span class="brand-mark">
                <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                  <path d="M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7z"></path>
                  <path d="M7 16h10M10 11v2m4-2v2"></path>
                </svg>
              </span>
              <span>
                <span class="brand-name">GO Cook</span>
                <small>ĐẦU BẾP TẠI GIA</small>
              </span>
            </a>
            <p>Kết nối đầu bếp và gia đình Việt. Bữa cơm tươi ngon, được chăm chút ngay trong gian bếp của bạn.</p>
          </div>
          <div>
            <h4>Khám phá GO Cook</h4>
            <a class="" href="${pageContext.request.contextPath}/chefs">Đầu bếp tại gia</a>
            <a class="" href="${pageContext.request.contextPath}/menus">Thực đơn có sẵn</a>
            <a class="" href="${pageContext.request.contextPath}/request">Đặt theo ngân sách</a>
            <a class="" href="${pageContext.request.contextPath}/offers">Ưu đãi hôm nay</a>
          </div>
          <div>
            <h4>Dành cho bạn</h4>
            <a class="" href="${pageContext.request.contextPath}/orders">Đơn đặt nấu</a>
            <a class="" href="${pageContext.request.contextPath}/account">Tài khoản của tôi</a>
            <a class="" href="${pageContext.request.contextPath}/become-chef">Trở thành đầu bếp</a>
            <a class="" href="${pageContext.request.contextPath}/seller">Kênh người bán</a>
          </div>
          <div>
            <h4>Hỗ trợ &amp; thông tin</h4>
            <a class="" href="${pageContext.request.contextPath}/help">Câu hỏi thường gặp</a>
            <a class="" href="${pageContext.request.contextPath}/chat">Liên hệ hỗ trợ</a>
            <a class="" href="${pageContext.request.contextPath}/admin">Kênh quản trị</a>
            <a class="" href="${pageContext.request.contextPath}/pages">Danh mục màn hình</a>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2026 GO Cook · Nhóm 2-1</span>
          <span>Giao diện mẫu · Dữ liệu và hình ảnh minh họa · Chưa xử lý giao dịch</span>
        </div>
      </div>
    </footer>
    <a class="help-float" href="${pageContext.request.contextPath}/chat" aria-label="Mở trò chuyện">
      <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
        <path d="M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"></path>
        <path d="M7 8h9M7 12h6"></path>
      </svg>
    </a>
  </body>
</html>
