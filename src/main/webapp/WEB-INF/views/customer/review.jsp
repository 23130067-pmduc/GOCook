<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Nghiệm thu &amp; đánh giá.">
    <title>Nghiệm thu &amp; đánh giá | GO Cook</title>
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
            <span>Bữa ăn hôm nay có vừa ý bạn?</span>
          </nav>
          <h1>Bữa ăn hôm nay có vừa ý bạn?</h1>
          <p class="lead">Kiểm tra chất lượng phục vụ và chia sẻ với đầu bếp.</p>
        </div>
        <div class="split">
          <form class="stack">
            <section class="card stack">
              <h3>Kiểm tra sau bữa ăn</h3>
              <label class="check">
                <input type="checkbox" name="enough">
                <span>Đủ món và đúng khẩu phần đã đặt.</span>
              </label>
              <label class="check">
                <input type="checkbox" name="quality">
                <span>Nguyên liệu và món ăn đáp ứng yêu cầu.</span>
              </label>
              <label class="check">
                <input type="checkbox" name="clean">
                <span>Gian bếp và dụng cụ đã được dọn sạch.</span>
              </label>
              <label class="check">
                <input type="checkbox" name="hygiene">
                <span>Đầu bếp giữ vệ sinh trong quá trình phục vụ.</span>
              </label>
            </section>
            <section class="card stack">
              <h3>Đánh giá trải nghiệm</h3>
              <fieldset>
                <legend>Bạn hài lòng ở mức nào?</legend>
                <div class="choices">
                  <label class="choice">
                    <input type="radio" name="rating" value="0" checked>
                    <span>5 ★</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="rating" value="1">
                    <span>4 ★</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="rating" value="2">
                    <span>3 ★</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="rating" value="3">
                    <span>2 ★</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="rating" value="4">
                    <span>1 ★</span>
                  </label>
                </div>
              </fieldset>
              <label class="field" for="feedback">Nhận xét của bạn<textarea id="feedback" name="feedback" placeholder="Điều gì khiến bữa ăn hôm nay trở nên đặc biệt?"></textarea>
              </label>
              <label class="field" for="review-photo">Ảnh bữa ăn<input id="review-photo" name="review-photo" type="file" value="" placeholder="" accept="image/*" multiple>
              </label>
            </section>
          </form>
          <aside class="card summary stack">
            <h3>Hoàn tất bữa ăn</h3>
            <p class="muted">Mâm cơm sum vầy miền Nam<br>Bếp Cô Mai · 4 người</p>
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
            <button class="btn" type="button" data-action="complete-order" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Xác nhận nghiệm thu</button>
            <a class="text-link" href="${pageContext.request.contextPath}/help">Liên hệ khi cần hỗ trợ</a>
            <p class="small muted">Chưa gửi đánh giá hoặc thay đổi trạng thái đơn.</p>
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
  </body>
</html>
