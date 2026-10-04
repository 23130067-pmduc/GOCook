<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Chi tiết đơn đặt nấu.">
    <title>Chi tiết đơn đặt nấu | GO Cook</title>
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
            <a href="${pageContext.request.contextPath}/orders">Đơn đặt nấu</a>
            <span>/</span>
            <span>Đơn đặt nấu #GC-260926</span>
          </nav>
          <h1>Đơn đặt nấu #GC-260926</h1>
          <p class="lead">Đã xác nhận · 26/09/2026</p>
        </div>
        <div class="split">
          <div class="stack">
            <section class="card stack">
              <div class="order-item">
                <img class="" src="${pageContext.request.contextPath}/assets/meal.png" alt="Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc" loading="lazy">
                <div>
                  <h3>Mâm Cơm Sum Vầy Miền Nam</h3>
                  <p class="muted">Bếp Cô Mai · 4 người · 4 món</p>
                </div>
              </div>
              <hr class="divider">
              <div class="grid grid-2">
                <div>
                  <p class="small muted">Lịch dùng bữa</p>
                  <strong>26/09/2026 · 18:30</strong>
                </div>
                <div>
                  <p class="small muted">Khu vực nấu</p>
                  <strong>Bình Thạnh, TP. Hồ Chí Minh</strong>
                </div>
              </div>
              <div class="soft">Ghi chú: ít cay, để riêng nước chấm.</div>
            </section>
            <section class="card stack">
              <h3>Đầu bếp phụ trách</h3>
              <div class="row">
                <img class="avatar" src="${pageContext.request.contextPath}/assets/chef.png" alt="Ảnh minh họa đầu bếp nấu ăn tại nhà" loading="lazy">
                <strong>Nguyễn Thị Mai · Bếp Cô Mai</strong>
              </div>
              <div class="row">
                <a class="btn secondary" href="${pageContext.request.contextPath}/chat">Nhắn tin</a>
                <a class="text-link" href="${pageContext.request.contextPath}/tracking">Theo dõi đơn đang nấu mẫu</a>
              </div>
            </section>
          </div>
          <aside class="card summary stack">
            <h3>Chi phí đặt lịch</h3>
            <div>
              <div class="summary-line">
                <span>Thực đơn · 4 người</span>
                <strong>480.000đ</strong>
              </div>
              <div class="summary-line">
                <span>Phí nguyên liệu &amp; công nấu</span>
                <span class="green">Đã bao gồm</span>
              </div>
              <div class="summary-line">
                <span>Dọn dẹp gian bếp</span>
                <span class="green">Đã bao gồm</span>
              </div>
              <div class="summary-line">
                <span>Ưu đãi</span>
                <span>0đ</span>
              </div>
              <div class="summary-line total">
                <span>Tổng cộng</span>
                <strong>480.000đ</strong>
              </div>
            </div>
            <span class="badge ">Đã thanh toán · Dữ liệu mẫu</span>
            <button class="btn secondary" type="button" data-action="cancel-order" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Yêu cầu hủy lịch</button>
            <a class="text-link" href="${pageContext.request.contextPath}/help">Xem chính sách dịch vụ</a>
          </aside>
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
      <script>window.GOCOOK_CONTEXT_PATH = window.GOCOOK_CONTEXT_PATH || "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/js/session-ui.js"></script>
  </body>
</html>
