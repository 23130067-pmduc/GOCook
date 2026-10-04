<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Hồ sơ tài khoản.">
    <title>Hồ sơ tài khoản | GO Cook</title>
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
          <a href="${pageContext.request.contextPath}/chefs">Khám phá đầu bếp</a>
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
              <a href="${pageContext.request.contextPath}/chefs">Khám phá đầu bếp</a>
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
            <span>Tài khoản của bạn</span>
          </nav>
          <h1>Tài khoản của bạn</h1>
          <p class="lead">Lưu những điều nhỏ để mỗi bữa cơm đều đúng ý.</p>
        </div>
        <div class="workspace">
          <nav class="card side-nav" aria-label="Tài khoản">
            <p class="eyebrow">Góc của bạn</p>
            <a href="${pageContext.request.contextPath}/account" aria-current="page">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="8" r="4"></circle>
                <path d="M4 21v-2a8 8 0 0 1 16 0v2"></path>
              </svg>Tài khoản</a>
            <a href="${pageContext.request.contextPath}/orders">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V5m-2 0h4M4 21h16"></path>
              </svg>Đơn đặt nấu</a>
            <a href="${pageContext.request.contextPath}/chat">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"></path>
                <path d="M7 8h9M7 12h6"></path>
              </svg>Tin nhắn</a>
            <a href="${pageContext.request.contextPath}/reset-password">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="m12 3 8 3v6c0 4-8 9-8 9s-8-5-8-9V6z"></path>
                <path d="m8 12 3 3 5-6"></path>
              </svg>Đổi mật khẩu</a>
            <a href="${pageContext.request.contextPath}/logout">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M10 3H4v18h6m-1-9h12m-4-4 4 4-4 4"></path>
              </svg>Đăng xuất</a>
          </nav>
          <form class="stack">
            <section class="card stack">
              <div class="row">
                <span class="avatar large">NA</span>
                <div>
                  <h3>Ngọc Anh</h3>
                  <p class="small muted">Tài khoản khách hàng · Hồ sơ mẫu</p>
                </div>
              </div>
              <div class="grid grid-2">
                <label class="field" for="full-name">Họ và tên<input id="full-name" name="full-name" type="text" value="Ngọc Anh" placeholder="" autocomplete="name">
                </label>
                <label class="field" for="email">Email<input id="email" name="email" type="email" value="" placeholder="Email của bạn" autocomplete="email">
                </label>
                <label class="field" for="mobile">Số điện thoại<input id="mobile" name="mobile" type="tel" value="" placeholder="Số điện thoại">
                </label>
                <label class="field" for="birthday">Ngày sinh<input id="birthday" name="birthday" type="date" value="" placeholder="">
                </label>
              </div>
            </section>
            <section class="card stack">
              <h3>Gian bếp &amp; địa chỉ</h3>
              <label class="field" for="home-address">Địa chỉ mặc định<input id="home-address" name="home-address" type="text" value="" placeholder="Số nhà, đường, phường, thành phố">
              </label>
              <label class="field" for="kitchen">Thiết bị sẵn có<textarea id="kitchen" name="kitchen" placeholder="">Bếp từ, nồi, chảo, tủ lạnh và bộ chén đĩa.</textarea>
              </label>
            </section>
            <section class="card stack">
              <h3>Khẩu vị gia đình</h3>
              <div class="choices">
                <label class="choice">
                  <input type="radio" name="taste" value="0" checked>
                  <span>Ít cay</span>
                </label>
                <label class="choice">
                  <input type="radio" name="taste" value="1">
                  <span>Vừa vị</span>
                </label>
                <label class="choice">
                  <input type="radio" name="taste" value="2">
                  <span>Thanh đạm</span>
                </label>
              </div>
              <label class="field" for="diet">Dị ứng &amp; lưu ý<textarea id="diet" name="diet" placeholder="Thực phẩm cần tránh cho các thành viên trong gia đình"></textarea>
              </label>
            </section>
            <button class="btn" type="button" data-action="update-profile" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Lưu thay đổi</button>
          </form>
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
