<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Tổng quan quản trị | GO Cook</title><link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css"></head>
<body><%@ include file="_admin-header.jspf" %>
<main id="main"><div class="container"><div class="page-heading"><nav class="breadcrumb"><a href="${pageContext.request.contextPath}/">Trang chủ</a><span>/</span><span>Quản trị</span></nav><h1>Tổng quan hệ thống</h1><p class="lead">Dữ liệu thật từ hệ thống quản trị GO Cook.</p></div>
<div class="workspace"><%@ include file="_admin-sidebar.jspf" %><div class="stack"><%@ include file="_admin-messages.jspf" %>
<div class="grid grid-4">
  <article class="card metric"><p class="small muted">Doanh thu đơn hoàn thành</p><p class="value green"><fmt:formatNumber value="${completedRevenue}" type="number" maxFractionDigits="0"/>đ</p><span class="small muted">Tổng doanh thu ghi nhận</span></article>
  <article class="card metric"><p class="small muted">Đơn đặt nấu</p><p class="value green">${orderCount}</p><span class="small muted">Tổng số đơn</span></article>
  <article class="card metric"><p class="small muted">Sản phẩm đang hiển thị</p><p class="value green">${productCount}</p><span class="small muted">Thực đơn hoạt động</span></article>
  <article class="card metric"><p class="small muted">Người dùng</p><p class="value green">${userCount}</p><span class="small muted">Tài khoản đăng ký</span></article>
</div>
<section class="card stack"><div class="between"><div><h3>Đơn hàng gần đây</h3><p class="small muted">5 đơn mới nhất theo lịch nấu</p></div><a class="text-link" href="${pageContext.request.contextPath}/admin/orders">Quản lý đơn hàng</a></div>
<div class="table-wrap"><table><thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Thực đơn</th><th>Ngày nấu</th><th>Tổng tiền</th><th>Trạng thái</th><th></th></tr></thead><tbody>
<c:forEach var="order" items="${recentOrders}"><tr><td><strong><c:out value="${order.orderCode}"/></strong></td><td><c:out value="${order.customerName}"/></td><td><c:out value="${order.productName}"/></td><td>${order.scheduledAtDisplay}</td><td><fmt:formatNumber value="${order.totalAmount}" type="number" maxFractionDigits="0"/>đ</td><td><span class="badge ${order.status.badgeClass}">${order.status.label}</span></td><td><a class="text-link" href="${pageContext.request.contextPath}/admin/order-detail?id=${order.id}">Chi tiết</a></td></tr></c:forEach>
<c:if test="${empty recentOrders}"><tr><td colspan="7" class="muted">Chưa có đơn hàng. Có thể chạy file seed demo nếu cần dữ liệu để trình bày.</td></tr></c:if>
</tbody></table></div></section>
</div></div></div></main>
<%@ include file="_admin-footer.jspf" %></body></html>
