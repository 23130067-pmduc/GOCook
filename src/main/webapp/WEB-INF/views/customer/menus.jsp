<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Thực đơn có sẵn.">
    <title>Thực đơn có sẵn | GO Cook</title>
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
          <a href="${pageContext.request.contextPath}/menus" aria-current="page">Thực đơn</a>
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
              <a href="${pageContext.request.contextPath}/menus" aria-current="page">Thực đơn</a>
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
            <span>Thực đơn cho mọi bữa sum vầy</span>
          </nav>
          <h1>Thực đơn cho mọi bữa sum vầy</h1>
          <p class="lead">Chọn vị quen thuộc. Để đầu bếp lo phần còn lại.</p>
        </div>
        <div class="notice row">
          <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
            <path d="M3 17h18M5 17a7 7 0 0 1 14 0M12 8V5m-2 0h4M4 21h16"></path>
          </svg> Giá theo người · Bao gồm nguyên liệu, công nấu và dọn dẹp</div>
        <div class="section workspace">
          <aside class="card filter" aria-label="Bộ lọc thực đơn">
            <h3>Bộ lọc</h3>
            <fieldset>
              <legend>Loại thực đơn</legend>
              <label class="check">
                <input type="checkbox" name="south">
                <span>Món miền Nam</span>
              </label>
              <label class="check">
                <input type="checkbox" name="vegetarian">
                <span>Món chay</span>
              </label>
              <label class="check">
                <input type="checkbox" name="family">
                <span>Bữa ăn gia đình</span>
              </label>
            </fieldset>
            <fieldset>
              <legend>Giá mỗi người</legend>
              <label class="check">
                <input type="checkbox" name="budget">
                <span>Dưới 120.000đ</span>
              </label>
              <label class="check">
                <input type="checkbox" name="standard">
                <span>120.000–200.000đ</span>
              </label>
              <label class="check">
                <input type="checkbox" name="premium">
                <span>Trên 200.000đ</span>
              </label>
            </fieldset>
            <fieldset>
              <legend>Gian bếp</legend>
              <label class="check">
                <input type="checkbox" name="mai">
                <span>Bếp Cô Mai</span>
              </label>
              <label class="check">
                <input type="checkbox" name="an">
                <span>Bếp An Nhiên</span>
              </label>
            </fieldset>
            <button class="btn full" type="button" data-action="filter" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Áp dụng bộ lọc</button>
          </aside>
          <section>
            <div class="toolbar">
              <strong>2 thực đơn gợi ý</strong>
              <label class="small">Sắp xếp <select name="sort" aria-label="Sắp xếp thực đơn">
                  <option>Được yêu thích</option>
                  <option>Giá tăng dần</option>
                  <option>Giá giảm dần</option>
                  <option>Bán chạy nhất</option>
                  <option>Mới nhất</option>
                  <option>Xem nhiều nhất</option>
                </select>
              </label>
            </div>
            <div class="grid grid-2">
              <article class="card media-card">
                <a href="${pageContext.request.contextPath}/menu-detail" class="media">
                  <img class="" src="${pageContext.request.contextPath}/assets/meal.png" alt="Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc" loading="lazy">
                  <span class="badge ">Món miền Nam</span>
                </a>
                <div class="card-body">
                  <div class="between">
                    <span class="small muted">Bếp Cô Mai · 4 món</span>
                    <span class="small amber">★ 4,9</span>
                  </div>
                  <h3>
                    <a href="${pageContext.request.contextPath}/menu-detail">Mâm Cơm Sum Vầy Miền Nam</a>
                  </h3>
                  <p class="small muted">Cá kho tộ · Canh chua tôm · Rau muống xào · Thịt luộc</p>
                  <div class="between">
                    <span class="price">120.000đ<small> / người</small>
                    </span>
                    <span class="small muted">4 người</span>
                  </div>
                  <a class="btn secondary full" href="${pageContext.request.contextPath}/menu-detail">Xem thực đơn</a>
                </div>
              </article>
              <article class="card media-card">
                <a href="${pageContext.request.contextPath}/menu-vegetarian" class="media">
                  <img class="" src="${pageContext.request.contextPath}/assets/vegetarian.png" alt="Mâm cơm chay với đậu hũ, canh nấm, rau xào và gỏi cuốn" loading="lazy">
                  <span class="badge ">Món chay</span>
                </a>
                <div class="card-body">
                  <div class="between">
                    <span class="small muted">Bếp Cô Mai · 4 món</span>
                    <span class="small amber">★ 4,9</span>
                  </div>
                  <h3>
                    <a href="${pageContext.request.contextPath}/menu-vegetarian">Mâm Chay Thanh Lành</a>
                  </h3>
                  <p class="small muted">Đậu hũ sốt cà · Canh nấm · Rau xào · Gỏi cuốn</p>
                  <div class="between">
                    <span class="price">105.000đ<small> / người</small>
                    </span>
                    <span class="small muted">4 người</span>
                  </div>
                  <a class="btn secondary full" href="${pageContext.request.contextPath}/menu-vegetarian">Xem thực đơn</a>
                </div>
              </article>
            </div>
            <div class="notice warm section">Bạn có khẩu vị riêng? <a class="text-link" href="${pageContext.request.contextPath}/request">Đặt theo ngân sách →</a>
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
