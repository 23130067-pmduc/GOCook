<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Chi tiết đơn ${order.orderCode} | GO Cook</title><link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css"></head>
<body><%@ include file="_admin-header.jspf" %>
<main id="main"><div class="container"><div class="page-heading"><nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin/orders">Đơn hàng</a><span>/</span><span><c:out value="${order.orderCode}"/></span></nav><h1>Chi tiết đơn <c:out value="${order.orderCode}"/></h1><p class="lead">Thông tin đơn đặt nấu và trạng thái xử lý.</p></div>
<div class="workspace"><%@ include file="_admin-sidebar.jspf" %><div class="stack"><%@ include file="_admin-messages.jspf" %>
<section class="card stack">
  <div class="between"><div><h3><c:out value="${order.productName}"/></h3><p class="muted">Khách hàng: <c:out value="${order.customerName}"/> · ${order.guestCount} người</p></div><span class="badge ${order.status.badgeClass}">${order.status.label}</span></div>
  <div class="grid grid-2">
    <div class="soft"><strong>Thời gian</strong><p>${order.scheduledAtDisplay}</p></div>
    <div class="soft"><strong>Tổng tiền</strong><p><fmt:formatNumber value="${order.totalAmount}" type="number" maxFractionDigits="0"/>đ</p></div>
    <div class="soft"><strong>Đầu bếp</strong><p><c:out value="${empty order.chefName ? 'Chưa phân công' : order.chefName}"/></p></div>
    <div class="soft"><strong>Email khách hàng</strong><p><c:out value="${empty order.customerEmail ? '—' : order.customerEmail}"/></p></div>
  </div>
  <div><strong>Địa chỉ phục vụ</strong><p><c:out value="${empty order.serviceAddress ? '—' : order.serviceAddress}"/></p></div>
  <div><strong>Ghi chú khách hàng</strong><p><c:out value="${empty order.customerNote ? 'Không có' : order.customerNote}"/></p></div>
</section>
<form class="card stack" method="post" action="${pageContext.request.contextPath}/admin/orders/update">
  <input type="hidden" name="id" value="${order.id}">
  <h3>Xử lý đơn đặt nấu</h3>
  <label class="field">Trạng thái đơn
    <select name="status" required><c:forEach var="s" items="${allowedOrderStatuses}"><option value="${s.value}" ${order.statusName eq s.value ? 'selected' : ''}>${s.label}</option></c:forEach></select>
    <small>Chỉ hiển thị các bước chuyển hợp lệ theo tiến trình đơn hàng.</small>
  </label>
  <label class="field">Ghi chú nội bộ<textarea name="internalNote" maxlength="5000" placeholder="Thông tin chỉ dành cho quản trị viên"><c:out value="${order.internalNote}"/></textarea></label>
  <div class="row"><button class="btn" type="submit">Cập nhật đơn</button><a class="btn secondary" href="${pageContext.request.contextPath}/admin/orders">Quay lại</a></div>
</form>
</div></div></div></main>
<%@ include file="_admin-footer.jspf" %></body></html>
