<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="GO Cook — Thống kê nền tảng quản trị.">
  <title>Thống kê nền tảng | GO Cook</title>
  <link rel="icon" href="${pageContext.request.contextPath}/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<%@ include file="_admin-header.jspf" %>

<main id="main">
  <div class="container">
    <div class="page-heading">
      <nav class="breadcrumb" aria-label="Đường dẫn">
        <a href="${pageContext.request.contextPath}/admin">Quản trị</a>
        <span>/</span>
        <span>Thống kê</span>
      </nav>
      <h1>Thống kê nền tảng</h1>
      <p class="lead">Theo dõi doanh thu, đơn đặt nấu và cơ cấu hoạt động của GO Cook.</p>
    </div>

    <div class="workspace">
      <%@ include file="_admin-sidebar.jspf" %>

      <div class="stack">
        <%@ include file="_admin-messages.jspf" %>

        <form class="card grid grid-3">
          <label class="field" for="from-date">
            Từ ngày
            <input id="from-date" name="from-date" type="date" value="2026-09-01">
          </label>

          <label class="field" for="to-date">
            Đến ngày
            <input id="to-date" name="to-date" type="date" value="2026-09-30">
          </label>

          <div class="field">
            <span>&nbsp;</span>
            <button
                class="btn"
                type="button"
                data-action="filter-statistics"
                disabled
                title="Chức năng sẽ được tích hợp ở giai đoạn tiếp theo">
              Xem thống kê
            </button>
          </div>
        </form>

        <div class="grid grid-4">
          <article class="card metric">
            <p class="small muted">Doanh thu gộp</p>
            <p class="value green">48,6 triệu</p>
            <span class="small muted">Trong tháng 09</span>
          </article>

          <article class="card metric">
            <p class="small muted">Đơn đặt nấu</p>
            <p class="value green">108</p>
            <span class="small muted">Đơn đã ghi nhận</span>
          </article>

          <article class="card metric">
            <p class="small muted">Đầu bếp</p>
            <p class="value green">24</p>
            <span class="small muted">Đối tác hoạt động</span>
          </article>

          <article class="card metric">
            <p class="small muted">Người dùng</p>
            <p class="value green">386</p>
            <span class="small muted">Tài khoản đăng ký</span>
          </article>
        </div>

        <div class="grid grid-2">
          <figure class="card stack-sm">
            <figcaption>
              <h3>Doanh thu theo tháng</h3>
              <p class="small muted">Triệu đồng · Số liệu minh họa</p>
            </figcaption>

            <div class="chart" role="img" aria-label="Biểu đồ doanh thu 6 tháng">
              <div class="chart-col">
                <span>19.3</span>
                <div class="bar h35"></div>
                <span>T4</span>
              </div>
              <div class="chart-col">
                <span>26.5</span>
                <div class="bar h48"></div>
                <span>T5</span>
              </div>
              <div class="chart-col">
                <span>31.5</span>
                <div class="bar h57"></div>
                <span>T6</span>
              </div>
              <div class="chart-col">
                <span>36.5</span>
                <div class="bar h66"></div>
                <span>T7</span>
              </div>
              <div class="chart-col">
                <span>41.4</span>
                <div class="bar h75"></div>
                <span>T8</span>
              </div>
              <div class="chart-col">
                <span>48.6</span>
                <div class="bar h88"></div>
                <span>T9</span>
              </div>
            </div>
          </figure>

          <figure class="card">
            <figcaption>
              <h3>Cơ cấu dịch vụ</h3>
              <p class="small muted">Tỷ trọng đơn đặt nấu mẫu</p>
            </figcaption>

            <div class="donut" role="img" aria-label="Thực đơn có sẵn 62%, theo ngân sách 38%">
              <div>
                <strong>100%</strong>
                <small>Đơn đặt nấu</small>
              </div>
            </div>

            <div class="summary-line">
              <span><i class="legend-dot"></i>Thực đơn có sẵn</span>
              <strong>62%</strong>
            </div>

            <div class="summary-line">
              <span><i class="legend-dot gold"></i>Theo ngân sách</span>
              <strong>38%</strong>
            </div>
          </figure>
        </div>
      </div>
    </div>
  </div>
</main>

<%@ include file="_admin-footer.jspf" %>
</body>
</html>
