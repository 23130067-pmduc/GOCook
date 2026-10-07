<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt" %>
<!doctype html>
<html lang="vi">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Quản lý sản phẩm | GO Cook</title><link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css"></head>
<body>
<%@ include file="_admin-header.jspf" %>
<main id="main"><div class="container">
  <div class="page-heading"><nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin">Quản trị</a><span>/</span><span>Sản phẩm</span></nav><h1>Quản lý sản phẩm</h1><p class="lead">Tìm kiếm, lọc và quản lý vòng đời các thực đơn trên GO Cook.</p></div>
  <div class="workspace">
    <%@ include file="_admin-sidebar.jspf" %>
    <div class="stack">
      <%@ include file="_admin-messages.jspf" %>
      <div class="between"><div></div><a class="btn" href="${pageContext.request.contextPath}/admin/product-new">+ Thêm thực đơn</a></div>
      <form class="card grid grid-3" method="get" action="${pageContext.request.contextPath}/admin/products">
        <label class="field">Tìm thực đơn<input name="q" value="<c:out value='${q}'/>" placeholder="Tên, mô tả hoặc món ăn"></label>
        <label class="field">Danh mục
          <select name="category"><option value="">Tất cả</option><c:forEach var="category" items="${categories}"><option value="<c:out value='${category}'/>" ${selectedCategory eq category ? 'selected' : ''}><c:out value="${category}"/></option></c:forEach></select>
        </label>
        <label class="field">Trạng thái
          <select name="status"><option value="">Tất cả</option><c:forEach var="status" items="${productStatuses}"><option value="${status.value}" ${selectedStatus eq status.value ? 'selected' : ''}>${status.label}</option></c:forEach></select>
        </label>
        <label class="field">Số dòng
          <select name="size"><option value="10" ${pageSize eq 10 ? 'selected' : ''}>10</option><option value="20" ${pageSize eq 20 ? 'selected' : ''}>20</option><option value="50" ${pageSize eq 50 ? 'selected' : ''}>50</option></select>
        </label>
        <div class="row"><button class="btn" type="submit">Lọc</button><a class="btn secondary" href="${pageContext.request.contextPath}/admin/products">Đặt lại</a></div>
      </form>
      <section class="card stack">
        <div class="table-wrap"><table>
          <caption>Hiển thị ${productPage.numberOfElements} / ${productPage.totalElements} thực đơn</caption>
          <thead><tr><th>Mã</th><th>Thực đơn</th><th>Danh mục</th><th>Giá / người</th><th>Số khách</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
          <tbody>
          <c:forEach var="product" items="${products}"><tr>
            <td>${product.displayCode}</td>
            <td><strong><c:out value="${product.name}"/></strong></td>
            <td><c:out value="${product.category}"/></td>
            <td><fmt:formatNumber value="${product.unitPrice}" type="number" maxFractionDigits="0"/>đ</td>
            <td>${product.minGuests}–${product.maxGuests}</td>
            <td><span class="badge ${product.status.badgeClass}">${product.status.label}</span></td>
            <td><div class="row">
              <a class="text-link" href="${pageContext.request.contextPath}/admin/product-edit?id=${product.id}">Sửa</a>
              <form method="post" action="${pageContext.request.contextPath}/admin/products/toggle-visibility">
                <input type="hidden" name="id" value="${product.id}">
                <button class="btn ghost sm" type="submit">${product.status.value eq 'PUBLISHED' ? 'Ẩn' : 'Xuất bản'}</button>
              </form>
            </div></td>
          </tr></c:forEach>
          <c:if test="${empty products}"><tr><td colspan="7" class="muted">Chưa có thực đơn phù hợp.</td></tr></c:if>
          </tbody>
        </table></div>
        <c:if test="${productPage.totalPages > 1}">
          <div class="between"><span class="small muted">Trang ${productPage.number + 1} / ${productPage.totalPages}</span><div class="row">
            <c:choose><c:when test="${productPage.first}"><span class="btn secondary sm">← Trước</span></c:when><c:otherwise><c:url var="prevUrl" value="/admin/products"><c:param name="q" value="${q}"/><c:param name="category" value="${selectedCategory}"/><c:param name="status" value="${selectedStatus}"/><c:param name="size" value="${pageSize}"/><c:param name="page" value="${productPage.number - 1}"/></c:url><a class="btn secondary sm" href="${prevUrl}">← Trước</a></c:otherwise></c:choose>
            <c:choose><c:when test="${productPage.last}"><span class="btn secondary sm">Sau →</span></c:when><c:otherwise><c:url var="nextUrl" value="/admin/products"><c:param name="q" value="${q}"/><c:param name="category" value="${selectedCategory}"/><c:param name="status" value="${selectedStatus}"/><c:param name="size" value="${pageSize}"/><c:param name="page" value="${productPage.number + 1}"/></c:url><a class="btn secondary sm" href="${nextUrl}">Sau →</a></c:otherwise></c:choose>
          </div></div>
        </c:if>
      </section>
    </div>
  </div>
</div></main>
<%@ include file="_admin-footer.jspf" %>
</body></html>
