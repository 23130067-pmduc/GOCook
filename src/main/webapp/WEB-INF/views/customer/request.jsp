<!doctype html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="GO Cook — Đặt đầu bếp nấu ăn tại nhà. Tạo yêu cầu nấu ăn.">
    <title>Tạo yêu cầu nấu ăn | GO Cook</title>
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
          <a href="${pageContext.request.contextPath}/request" aria-current="page">Tạo yêu cầu</a>
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
              <a href="${pageContext.request.contextPath}/request" aria-current="page">Tạo yêu cầu</a>
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
            <span>Một bữa ăn đúng ý bạn</span>
          </nav>
          <h1>Một bữa ăn đúng ý bạn</h1>
          <p class="lead">Chia sẻ khẩu vị, số người và ngân sách. Đầu bếp sẽ lên thực đơn phù hợp.</p>
        </div>
        <div class="split">
          <form class="stack">
            <section class="card stack">
              <div>
                <p class="eyebrow">Bước 01</p>
                <h3>Bạn muốn ăn gì?</h3>
              </div>
              <label class="field" for="desired-dishes">Món ăn mong muốn<textarea id="desired-dishes" name="desired-dishes" placeholder="">Cá kho tộ, canh chua tôm, rau muống xào tỏi, thịt luộc.</textarea>
              </label>
              <fieldset>
                <legend>Phong cách ẩm thực</legend>
                <div class="choices">
                  <label class="choice">
                    <input type="radio" name="cuisine" value="0" checked>
                    <span>Miền Nam</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="cuisine" value="1">
                    <span>Miền Bắc</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="cuisine" value="2">
                    <span>Miền Trung</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="cuisine" value="3">
                    <span>Món chay</span>
                  </label>
                </div>
              </fieldset>
            </section>
            <section class="card stack">
              <div>
                <p class="eyebrow">Bước 02</p>
                <h3>Khẩu phần &amp; khẩu vị</h3>
              </div>
              <div class="grid grid-2">
                <label class="field" for="adults">Số người lớn<input id="adults" name="adults" type="number" value="4" placeholder="" min="1">
                </label>
                <label class="field" for="children">Số trẻ em<input id="children" name="children" type="number" value="0" placeholder="" min="0">
                </label>
              </div>
              <label class="field" for="avoid">Dị ứng hoặc thực phẩm cần tránh<textarea id="avoid" name="avoid" placeholder="Ví dụ: dị ứng đậu phộng, không dùng hải sản..."></textarea>
              </label>
              <fieldset>
                <legend>Mức độ cay</legend>
                <div class="choices">
                  <label class="choice">
                    <input type="radio" name="spice" value="0" checked>
                    <span>Không cay</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="spice" value="1">
                    <span>Ít cay</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="spice" value="2">
                    <span>Vừa</span>
                  </label>
                  <label class="choice">
                    <input type="radio" name="spice" value="3">
                    <span>Cay</span>
                  </label>
                </div>
              </fieldset>
            </section>
            <section class="card stack">
              <div>
                <p class="eyebrow">Bước 03</p>
                <h3>Thời gian &amp; gian bếp</h3>
              </div>
              <div class="grid grid-2">
                <label class="field" for="request-date">Ngày dùng bữa<input id="request-date" name="request-date" type="date" value="" placeholder="">
                </label>
                <label class="field" for="meal-time">Bữa ăn<select id="meal-time" name="meal-time">
                    <option>Bữa tối</option>
                    <option>Bữa trưa</option>
                  </select>
                </label>
              </div>
              <label class="field" for="kitchen-address">Địa chỉ<input id="kitchen-address" name="kitchen-address" type="text" value="" placeholder="Địa chỉ nơi đầu bếp sẽ đến nấu">
              </label>
              <label class="check">
                <input type="checkbox" name="equipment">
                <span>Gian bếp có bếp nấu, nồi chảo và dụng cụ cơ bản.</span>
              </label>
            </section>
            <section class="card stack">
              <div>
                <p class="eyebrow">Bước 04</p>
                <h3>Ngân sách của bạn</h3>
              </div>
              <div class="grid grid-2">
                <label class="field" for="budget-min">Tối thiểu (đ)<input id="budget-min" name="budget-min" type="number" value="400000" placeholder="" min="0" step="50000">
                </label>
                <label class="field" for="budget-max">Tối đa (đ)<input id="budget-max" name="budget-max" type="number" value="600000" placeholder="" min="0" step="50000">
                </label>
              </div>
              <p class="notice">Ngân sách cho toàn bộ bữa ăn, bao gồm nguyên liệu và công nấu.</p>
              <div class="upload">
                <label class="field" for="reference-photo">Ảnh tham khảo món ăn<input id="reference-photo" name="reference-photo" type="file" value="" placeholder="" accept="image/*">
                </label>
              </div>
            </section>
          </form>
          <aside class="card summary stack">
            <span class="icon-box">
              <svg class="icon" viewbox="0 0 24 24" aria-hidden="true">
                <path d="M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7z"></path>
                <path d="M7 16h10M10 11v2m4-2v2"></path>
              </svg>
            </span>
            <h3>Bữa cơm riêng của gia đình</h3>
            <ul class="check-list">
              <li>Tự chọn món mong muốn</li>
              <li>Điều chỉnh theo dị ứng, khẩu vị</li>
              <li>Xem báo giá trước khi quyết định</li>
            </ul>
            <button class="btn" type="button" data-action="create-request" disabled title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">Gửi yêu cầu nấu ăn</button>
            <a class="btn secondary full" href="${pageContext.request.contextPath}/quotes">Xem báo giá mẫu</a>
            <a class="text-link" href="${pageContext.request.contextPath}/matching">Xem gợi ý đầu bếp bằng AI</a>
            <p class="small muted">Thông tin trên form chưa được gửi đi.</p>
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
