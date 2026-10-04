<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Quản lý đơn đặt nấu.">
    <title>Quản lý đơn đặt nấu | GO Cook</title>
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
            <span>Quản lý đơn đặt nấu</span>
          </nav>
          <h1>Quản lý đơn đặt nấu</h1>
          <p class="lead">Bếp Cô Mai · Kênh người bán · Dữ liệu minh họa</p>
        </div>
        <div class="workspace">
          <nav class="card side-nav" aria-label="Quản lý">
            <p class="eyebrow">Kênh người bán</p>
            <a href="${pageContext.request.contextPath}/seller">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                <rect x="14" y="14" width="7" height="7" rx="1"></rect>
              </svg>Tổng quan</a>
            <a href="${pageContext.request.contextPath}/seller/products">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V5m-2 0h4M4 21h16"></path>
              </svg>Thực đơn của tôi</a>
            <a href="${pageContext.request.contextPath}/seller/orders" aria-current="page">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="16" rx="2"></rect>
                <path d="M7 3v4m10-4v4M3 10h18m-13 5h3"></path>
              </svg>Đơn đặt nấu</a>
            <a href="${pageContext.request.contextPath}/seller/revenue">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M4 3v18h17M8 17v-5m5 5V7m5 10V4"></path>
              </svg>Doanh thu</a>
            <a href="${pageContext.request.contextPath}/seller/schedule">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M12 6v6l4 2"></path>
              </svg>Lịch phục vụ</a>
            <a href="${pageContext.request.contextPath}/chat">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"></path>
                <path d="M7 8h9M7 12h6"></path>
              </svg>Tin nhắn</a>
          </nav>
          <div class="stack">
            <form class="card grid grid-3">
              <label class="field" for="order-search">Tìm mã đơn<input id="order-search" name="order-search" type="text" value="" placeholder="#GC-...">
              </label>
              <label class="field" for="order-status">Trạng thái<select id="order-status" name="order-status">
                  <option>Tất cả</option>
                  <option>Chờ xác nhận</option>
                  <option>Đã xác nhận</option>
                  <option>Đang nấu</option>
                  <option>Hoàn thành</option>
                  <option>Đã hủy</option>
                </select>
              </label>
              <div class="field">
                <span> </span>
                <button class="btn" type="button" data-action="filter-orders" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Lọc đơn</button>
              </div>
            </form>
            <section class="card">
              <div class="table-wrap">
                <table>
                  <caption>Danh sách đơn mẫu</caption>
                  <thead>
                    <tr>
                      <th scope="col">Mã đơn</th>
                      <th scope="col">Khách hàng</th>
                      <th scope="col">Thực đơn</th>
                      <th scope="col">Ngày nấu</th>
                      <th scope="col">Tổng tiền</th>
                      <th scope="col">Trạng thái</th>
                      <th scope="col">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>#GC-260926</strong>
                      </td>
                      <td>Ngọc Anh</td>
                      <td>Mâm cơm sum vầy</td>
                      <td>26/09/2026</td>
                      <td>480.000đ</td>
                      <td>
                        <span class="badge ">Đã xác nhận</span>
                      </td>
                      <td>
                        <a class="text-link" href="${pageContext.request.contextPath}/seller/order-detail">Chi tiết</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>#GC-260924</strong>
                      </td>
                      <td>Minh Thư</td>
                      <td>Mâm cơm sum vầy</td>
                      <td>24/09/2026</td>
                      <td>480.000đ</td>
                      <td>
                        <span class="badge gold">Đang nấu</span>
                      </td>
                      <td>
                        <a class="text-link" href="${pageContext.request.contextPath}/seller/order-detail">Chi tiết</a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>#GC-260920</strong>
                      </td>
                      <td>Thanh Hà</td>
                      <td>Mâm chay thanh lành</td>
                      <td>20/09/2026</td>
                      <td>420.000đ</td>
                      <td>
                        <span class="badge gray">Hoàn thành</span>
                      </td>
                      <td>
                        <a class="text-link" href="${pageContext.request.contextPath}/seller/order-detail">Chi tiết</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
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
