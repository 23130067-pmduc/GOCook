<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Trung tâm trợ giúp.">
    <title>Trung tâm trợ giúp | GO Cook</title>
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
          <a href="${pageContext.request.contextPath}/help" aria-current="page">Trợ giúp</a>
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
              <a href="${pageContext.request.contextPath}/help" aria-current="page">Trợ giúp</a>
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
            <span>Bạn cần hỗ trợ điều gì?</span>
          </nav>
          <h1>Bạn cần hỗ trợ điều gì?</h1>
          <p class="lead">Tìm thông tin về đặt lịch, thực đơn và trải nghiệm nấu ăn tại nhà.</p>
        </div>
        <div class="split">
          <section class="card">
            <h2>Câu hỏi thường gặp</h2>
            <details class="faq">
              <summary>GO Cook giao đồ ăn hay nấu tại nhà?</summary>
              <p>Đây là dịch vụ đầu bếp đến nấu trực tiếp tại gian bếp của bạn. Thực đơn mẫu gồm nguyên liệu, công nấu và dọn dẹp.</p>
            </details>
            <details class="faq">
              <summary>Giá hiển thị tính cho bao nhiêu người?</summary>
              <p>Thực đơn có sẵn hiển thị giá mỗi người. Tổng tiền được tính theo số người và các khoản được xác nhận trước khi đặt.</p>
            </details>
            <details class="faq">
              <summary>Tôi có thể yêu cầu món ít cay hoặc tránh dị ứng không?</summary>
              <p>Bạn có thể ghi rõ yêu cầu trong phần ghi chú và trao đổi với đầu bếp trước khi xác nhận lịch.</p>
            </details>
            <details class="faq">
              <summary>Có thể hủy hoặc đổi lịch không?</summary>
              <p>Mục này là khung chính sách. Nhóm cần bổ sung thời hạn, điều kiện hủy và mức hoàn tiền theo mô hình dịch vụ đã chốt trước khi vận hành.</p>
            </details>
            <details class="faq">
              <summary>GO Cook có bảo hiểm hoặc ký quỹ không?</summary>
              <p>Các nội dung bảo hiểm, ký quỹ và bảo đảm thanh toán trong thiết kế gốc chưa được xác minh triển khai. Nhóm cần hoàn thiện chính sách và tích hợp đối tác trước khi công bố cam kết cụ thể.</p>
            </details>
          </section>
          <form class="card stack">
            <h3>Gửi yêu cầu hỗ trợ</h3>
            <label class="field" for="support-email">Email liên hệ<input id="support-email" name="support-email" type="email" value="" placeholder="ban@example.com">
            </label>
            <label class="field" for="support-topic">Chủ đề<select id="support-topic" name="support-topic">
                <option>Đặt lịch nấu ăn</option>
                <option>Thanh toán</option>
                <option>Thay đổi hoặc hủy lịch</option>
                <option>Vấn đề khác</option>
              </select>
            </label>
            <label class="field" for="support-message">Nội dung<textarea id="support-message" name="support-message" placeholder="Mô tả vấn đề bạn gặp phải..."></textarea>
            </label>
            <button class="btn" type="button" data-action="support" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Gửi yêu cầu</button>
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
      <script>window.GOCOOK_CONTEXT_PATH = window.GOCOOK_CONTEXT_PATH || "${pageContext.request.contextPath}";</script>
    <script src="${pageContext.request.contextPath}/js/session-ui.js"></script>
  </body>
</html>
