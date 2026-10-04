<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Quản lý đơn hàng | GO Cook</title><link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css"></head>
<body><%@ include file="_admin-header.jspf" %>
<main id="main"><div class="container"><div class="page-heading"><nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin">Quản trị</a><span>/</span><span>Đơn hàng</span></nav><h1>Quản lý đơn hàng</h1><p class="lead">Tìm kiếm, lọc theo thời gian và cập nhật tiến trình các đơn đặt nấu.</p></div>
<div class="workspace"><%@ include file="_admin-sidebar.jspf" %><div class="stack"><%@ include file="_admin-messages.jspf" %>
<form class="card grid grid-3" method="get" action="${pageContext.request.contextPath}/admin/orders">
  <label class="field">Tìm đơn<input name="q" value="<c:out value='${q}'/>" placeholder="Mã đơn, khách, thực đơn hoặc đầu bếp"></label>
  <label class="field">Trạng thái<select name="status"><option value="">Tất cả</option><c:forEach var="s" items="${orderStatuses}"><option value="${s.value}" ${selectedStatus eq s.value ? 'selected' : ''}>${s.label}</option></c:forEach></select></label>
  <label class="field">Từ ngày<input type="date" name="from" value="${from}"></label>
  <label class="field">Đến ngày<input type="date" name="to" value="${to}"></label>
  <label class="field">Số dòng<select name="size"><option value="10" ${pageSize eq 10 ? 'selected' : ''}>10</option><option value="20" ${pageSize eq 20 ? 'selected' : ''}>20</option><option value="50" ${pageSize eq 50 ? 'selected' : ''}>50</option></select></label>
  <div class="field"><span>&nbsp;</span><div class="row"><button class="btn" type="submit">Lọc đơn hàng</button><a class="btn secondary" href="${pageContext.request.contextPath}/admin/orders">Đặt lại</a></div></div>
</form>
<section class="card stack"><div class="table-wrap"><table><caption>Hiển thị ${orderPage.numberOfElements} / ${orderPage.totalElements} đơn hàng</caption>
<thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Thực đơn</th><th>Ngày nấu</th><th>Tổng tiền</th><th>Trạng thái</th><th>Thao tác</th></tr></thead><tbody>
<c:forEach var="order" items="${orders}"><tr><td><strong><c:out value="${order.orderCode}"/></strong></td><td><c:out value="${order.customerName}"/></td><td><c:out value="${order.productName}"/></td><td>${order.scheduledAtDisplay}</td><td><fmt:formatNumber value="${order.totalAmount}" type="number" maxFractionDigits="0"/>đ</td><td><span class="badge ${order.status.badgeClass}">${order.status.label}</span></td><td><a class="text-link" href="${pageContext.request.contextPath}/admin/order-detail?id=${order.id}">Chi tiết</a></td></tr></c:forEach>
<c:if test="${empty orders}"><tr><td colspan="7" class="muted">Chưa có đơn hàng phù hợp.</td></tr></c:if>
</tbody></table></div>
<c:if test="${orderPage.totalPages > 1}"><div class="between"><span class="small muted">Trang ${orderPage.number + 1} / ${orderPage.totalPages}</span><div class="row">
<c:choose><c:when test="${orderPage.first}"><span class="btn secondary sm">← Trước</span></c:when><c:otherwise><c:url var="prevUrl" value="/admin/orders"><c:param name="q" value="${q}"/><c:param name="status" value="${selectedStatus}"/><c:param name="from" value="${from}"/><c:param name="to" value="${to}"/><c:param name="size" value="${pageSize}"/><c:param name="page" value="${orderPage.number - 1}"/></c:url><a class="btn secondary sm" href="${prevUrl}">← Trước</a></c:otherwise></c:choose>
<c:choose><c:when test="${orderPage.last}"><span class="btn secondary sm">Sau →</span></c:when><c:otherwise><c:url var="nextUrl" value="/admin/orders"><c:param name="q" value="${q}"/><c:param name="status" value="${selectedStatus}"/><c:param name="from" value="${from}"/><c:param name="to" value="${to}"/><c:param name="size" value="${pageSize}"/><c:param name="page" value="${orderPage.number + 1}"/></c:url><a class="btn secondary sm" href="${nextUrl}">Sau →</a></c:otherwise></c:choose>
</div></div></c:if>
</section>
</div></div></div></main>
<%@ include file="_admin-footer.jspf" %></body></html>
