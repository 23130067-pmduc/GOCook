<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Đặt lịch &amp; thanh toán.">
    <title>Đặt lịch &amp; thanh toán | GO Cook</title>
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
      <div class="stepper">
        <span class="">
          <b>1</b>Chọn thực đơn</span>
        <span class="">
          <b>2</b>Giỏ hàng</span>
        <span class="current">
          <b>3</b>Thanh toán</span>
        <span class="">
          <b>4</b>Xác nhận</span>
      </div>
      <div class="container">
        <div class="page-heading">
          <nav class="breadcrumb" aria-label="Đường dẫn">
            <a href="${pageContext.request.contextPath}/">Trang chủ</a>
            <span>/</span>
            <span>Xác nhận lịch nấu</span>
          </nav>
          <h1>Xác nhận lịch nấu</h1>
          <p class="lead">Một bước nữa để bữa cơm nhà được chuẩn bị chu đáo.</p>
        </div>
        <div class="split">
          <form class="stack">
            <section class="card stack">
              <h3>Thực đơn đã chọn</h3>
              <div class="order-item">
                <img class="" src="${pageContext.request.contextPath}/assets/vegetarian.png" alt="Mâm cơm chay với đậu hũ, canh nấm, rau xào và gỏi cuốn" loading="lazy">
                <div>
                  <h3>Mâm Chay Thanh Lành</h3>
                  <p class="small muted">Bếp Cô Mai · 4 món · 105.000đ/người</p>
                  <p class="small muted">26/09/2026 · Bữa tối 18:30</p>
                </div>
              </div>
            </section>
            <section class="card stack">
              <h3>Địa chỉ &amp; thời gian nấu</h3>
              <div class="grid grid-2">
                <label class="field" for="customer">Họ và tên<input id="customer" name="customer" type="text" value="Ngọc Anh" placeholder="">
                </label>
                <label class="field" for="phone">Số điện thoại<input id="phone" name="phone" type="tel" value="" placeholder="Nhập số điện thoại" autocomplete="tel">
                </label>
              </div>
              <label class="field" for="address">Địa chỉ nấu ăn<input id="address" name="address" type="text" value="" placeholder="Số nhà, đường, phường, thành phố" autocomplete="street-address">
              </label>
              <div class="grid grid-2">
                <label class="field" for="order-date">Ngày dùng bữa<input id="order-date" name="order-date" type="date" value="2026-09-26" placeholder="">
                </label>
                <label class="field" for="order-time">Giờ dùng bữa<select id="order-time" name="order-time">
                    <option>18:30</option>
                    <option>11:30</option>
                  </select>
                </label>
              </div>
              <label class="field" for="allergies">Khẩu vị &amp; dị ứng thực phẩm<textarea id="allergies" name="allergies" placeholder="">Nấu ít cay, để riêng nước chấm.</textarea>
              </label>
            </section>
            <section class="card stack">
              <h3>Phương thức thanh toán</h3>
              <label class="payment-option">
                <input type="radio" name="payment" value="0" checked>
                <span>
                  <strong>Thẻ ngân hàng</strong>
                  <span class="small muted"> · ATM / Visa / Mastercard</span>
                </span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment" value="1">
                <span>
                  <strong>Ví điện tử</strong>
                  <span class="small muted"> · MoMo / ZaloPay</span>
                </span>
              </label>
              <label class="payment-option">
                <input type="radio" name="payment" value="2">
                <span>
                  <strong>Chuyển khoản</strong>
                  <span class="small muted"> · Mã QR ngân hàng</span>
                </span>
              </label>
            </section>
          </form>
          <aside class="card summary stack">
            <h3>Tóm tắt đặt lịch</h3>
            <div>
              <div class="summary-line">
                <span>Thực đơn · 4 người</span>
                <strong>420.000đ</strong>
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
                <strong>420.000đ</strong>
              </div>
            </div>
            <label class="field" for="voucher">Mã ưu đãi<input id="voucher" name="voucher" type="text" value="" placeholder="Nhập mã ưu đãi">
            </label>
            <button class="btn secondary" type="button" data-action="apply-voucher" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Áp dụng</button>
            <label class="check">
              <input type="checkbox" name="agree">
              <span>Tôi đã xem thông tin đặt lịch và chính sách dịch vụ.</span>
            </label>
            <button class="btn" type="button" data-action="checkout" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Thanh toán 420.000đ</button>
            <a class="text-link" href="${pageContext.request.contextPath}/success-vegetarian">Xem màn hình xác nhận mẫu</a>
            <p class="small muted">Chưa kết nối cổng thanh toán. Không nhập thông tin thẻ thật vào bản mẫu.</p>
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
