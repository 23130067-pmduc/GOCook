<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Danh mục màn hình.">
    <title>Danh mục màn hình | GO Cook</title>
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
            <span>Toàn bộ khung giao diện GO Cook</span>
          </nav>
          <h1>Toàn bộ khung giao diện GO Cook</h1>
          <p class="lead">Chọn một trang để xem. Các màn hình dùng chung styles.css và tài nguyên trong assets.</p>
        </div>
        <div class="notice">HTML + CSS thuần · Không JavaScript · Form và dữ liệu là mẫu · Các nút xử lý nghiệp vụ đang tắt.</div>
        <section class="section grid grid-3">
          <div class="card page-map">
            <h3>Khách hàng</h3>
            <a class="" href="${pageContext.request.contextPath}/">Đầu bếp tại gia</a>
            <a class="" href="${pageContext.request.contextPath}/menus">Thực đơn có sẵn</a>
            <a class="" href="${pageContext.request.contextPath}/chefs">Khám phá đầu bếp</a>
            <a class="" href="${pageContext.request.contextPath}/chef-detail">Bếp Cô Mai</a>
            <a class="" href="${pageContext.request.contextPath}/chef-an-nhien">Bếp An Nhiên</a>
            <a class="" href="${pageContext.request.contextPath}/menu-detail">Mâm Cơm Sum Vầy Miền Nam</a>
            <a class="" href="${pageContext.request.contextPath}/menu-vegetarian">Mâm Chay Thanh Lành</a>
            <a class="" href="${pageContext.request.contextPath}/cart">Giỏ hàng</a>
            <a class="" href="${pageContext.request.contextPath}/checkout">Đặt lịch &amp; thanh toán</a>
            <a class="" href="${pageContext.request.contextPath}/success">Xác nhận đặt lịch mẫu</a>
            <a class="" href="${pageContext.request.contextPath}/cart-vegetarian">Giỏ hàng</a>
            <a class="" href="${pageContext.request.contextPath}/checkout-vegetarian">Đặt lịch &amp; thanh toán</a>
            <a class="" href="${pageContext.request.contextPath}/success-vegetarian">Xác nhận đặt lịch mẫu</a>
            <a class="" href="${pageContext.request.contextPath}/cart-empty">Giỏ hàng trống</a>
            <a class="" href="${pageContext.request.contextPath}/request">Tạo yêu cầu nấu ăn</a>
            <a class="" href="${pageContext.request.contextPath}/quotes">Báo giá từ đầu bếp</a>
            <a class="" href="${pageContext.request.contextPath}/matching">Gợi ý đầu bếp bằng AI</a>
            <a class="" href="${pageContext.request.contextPath}/account">Hồ sơ tài khoản</a>
            <a class="" href="${pageContext.request.contextPath}/orders">Đơn đặt nấu của tôi</a>
            <a class="" href="${pageContext.request.contextPath}/order-detail">Chi tiết đơn đặt nấu</a>
            <a class="" href="${pageContext.request.contextPath}/tracking">Theo dõi tiến trình nấu</a>
            <a class="" href="${pageContext.request.contextPath}/chat">Trò chuyện với đầu bếp</a>
            <a class="" href="${pageContext.request.contextPath}/review">Nghiệm thu &amp; đánh giá</a>
            <a class="" href="${pageContext.request.contextPath}/offers">Ưu đãi &amp; khuyến mãi</a>
            <a class="" href="${pageContext.request.contextPath}/help">Trung tâm trợ giúp</a>
            <a class="" href="${pageContext.request.contextPath}/become-chef">Trở thành đầu bếp đối tác</a>
          </div>
          <div class="card page-map">
            <h3>Tài khoản</h3>
            <a class="" href="${pageContext.request.contextPath}/login">Đăng nhập</a>
            <a class="" href="${pageContext.request.contextPath}/register">Đăng ký</a>
            <a class="" href="${pageContext.request.contextPath}/forgot-password">Quên mật khẩu</a>
            <a class="" href="${pageContext.request.contextPath}/reset-password">Đặt mật khẩu mới</a>
            <a class="" href="${pageContext.request.contextPath}/verify-email">Xác nhận email</a>
            <a class="" href="${pageContext.request.contextPath}/logout">Đăng xuất</a>
          </div>
          <div class="card page-map">
            <h3>Người bán</h3>
            <a class="" href="${pageContext.request.contextPath}/seller">Xin chào, Cô Mai</a>
            <a class="" href="${pageContext.request.contextPath}/seller/products">Thực đơn của tôi</a>
            <a class="" href="${pageContext.request.contextPath}/seller/orders">Quản lý đơn đặt nấu</a>
            <a class="" href="${pageContext.request.contextPath}/seller/revenue">Doanh thu &amp; thống kê</a>
            <a class="" href="${pageContext.request.contextPath}/seller/schedule">Lịch phục vụ</a>
            <a class="" href="${pageContext.request.contextPath}/seller/product-new">Thêm thực đơn</a>
            <a class="" href="${pageContext.request.contextPath}/seller/product-edit">Chỉnh sửa thực đơn</a>
            <a class="" href="${pageContext.request.contextPath}/seller/order-detail">Chi tiết đơn #GC-260926</a>
          </div>
          <div class="card page-map">
            <h3>Quản trị</h3>
            <a class="" href="${pageContext.request.contextPath}/admin">Tổng quan hệ thống</a>
            <a class="" href="${pageContext.request.contextPath}/admin/users">Quản lý người dùng</a>
            <a class="" href="${pageContext.request.contextPath}/admin/products">Quản lý sản phẩm</a>
            <a class="" href="${pageContext.request.contextPath}/admin/orders">Quản lý đơn hàng</a>
            <a class="" href="${pageContext.request.contextPath}/admin/statistics">Thống kê nền tảng</a>
            <a class="" href="${pageContext.request.contextPath}/admin/product-new">Thêm thực đơn</a>
            <a class="" href="${pageContext.request.contextPath}/admin/product-edit">Chỉnh sửa thực đơn</a>
            <a class="" href="${pageContext.request.contextPath}/admin/user-edit">Chỉnh sửa người dùng</a>
            <a class="" href="${pageContext.request.contextPath}/admin/order-detail">Chi tiết đơn #GC-260926</a>
          </div>
        </section>
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
