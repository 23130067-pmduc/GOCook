<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Quản lý người dùng | GO Cook</title>
  <link rel="icon" href="${pageContext.request.contextPath}/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<%@ include file="_admin-header.jspf" %>
<main id="main">
  <div class="container">
    <div class="page-heading">
      <nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin">Quản trị</a><span>/</span><span>Người dùng</span></nav>
      <h1>Quản lý người dùng</h1>
      <p class="lead">Tìm kiếm, lọc, phân quyền và khóa/mở tài khoản.</p>
    </div>
    <div class="workspace">
      <%@ include file="_admin-sidebar.jspf" %>
      <div class="stack">
        <%@ include file="_admin-messages.jspf" %>
        <form class="card grid grid-3" method="get" action="${pageContext.request.contextPath}/admin/users">
          <label class="field">Tìm người dùng
            <input name="q" type="text" value="<c:out value='${q}'/>" placeholder="Tên hoặc email">
          </label>
          <label class="field">Vai trò
            <select name="role">
              <option value="">Tất cả</option>
              <option value="USER" ${selectedRole eq 'USER' ? 'selected' : ''}>Khách hàng</option>
              <option value="INSTRUCTOR" ${selectedRole eq 'INSTRUCTOR' ? 'selected' : ''}>Người bán</option>
              <option value="ADMIN" ${selectedRole eq 'ADMIN' ? 'selected' : ''}>Quản trị viên</option>
              <option value="COMPANY_ADMIN" ${selectedRole eq 'COMPANY_ADMIN' ? 'selected' : ''}>Quản trị công ty</option>
            </select>
          </label>
          <label class="field">Trạng thái
            <select name="status">
              <option value="">Tất cả</option>
              <option value="active" ${selectedStatus eq 'active' ? 'selected' : ''}>Đang hoạt động</option>
              <option value="inactive" ${selectedStatus eq 'inactive' ? 'selected' : ''}>Đã khóa</option>
            </select>
          </label>
          <label class="field">Số dòng
            <select name="size">
              <option value="10" ${pageSize eq 10 ? 'selected' : ''}>10</option>
              <option value="20" ${pageSize eq 20 ? 'selected' : ''}>20</option>
              <option value="50" ${pageSize eq 50 ? 'selected' : ''}>50</option>
            </select>
          </label>
          <div class="row">
            <button class="btn" type="submit">Tìm kiếm</button>
            <a class="btn secondary" href="${pageContext.request.contextPath}/admin/users">Đặt lại</a>
          </div>
        </form>

        <section class="card stack">
          <div class="table-wrap">
            <table>
              <caption>Hiển thị ${userPage.numberOfElements} / ${userPage.totalElements} người dùng</caption>
              <thead><tr><th>Mã</th><th>Tên hiển thị</th><th>Email</th><th>Vai trò</th><th>Ngày tham gia</th><th>Trạng thái</th><th>Thao tác</th></tr></thead>
              <tbody>
              <c:forEach var="user" items="${users}">
                <tr>
                  <td>ND-${user.id}</td>
                  <td><strong><c:out value="${user.username}"/></strong></td>
                  <td><c:out value="${user.email}"/></td>
                  <td><c:out value="${user.roleLabel}"/></td>
                  <td>${user.createdAtDisplay}</td>
                  <td>
                    <c:choose>
                      <c:when test="${user.active}"><span class="badge">Đang hoạt động</span></c:when>
                      <c:otherwise><span class="badge red">Đã khóa</span></c:otherwise>
                    </c:choose>
                  </td>
                  <td>
                    <div class="row">
                      <a class="text-link" href="${pageContext.request.contextPath}/admin/user-edit?id=${user.id}">Sửa</a>
                      <form method="post" action="${pageContext.request.contextPath}/admin/users/toggle">
                        <input type="hidden" name="id" value="${user.id}">
                        <button class="btn secondary sm" type="submit">${user.active ? 'Khóa' : 'Mở khóa'}</button>
                      </form>
                    </div>
                  </td>
                </tr>
              </c:forEach>
              <c:if test="${empty users}">
                <tr><td colspan="7" class="muted">Không có người dùng phù hợp.</td></tr>
              </c:if>
              </tbody>
            </table>
          </div>

          <c:if test="${userPage.totalPages > 1}">
            <div class="between">
              <span class="small muted">Trang ${userPage.number + 1} / ${userPage.totalPages}</span>
              <div class="row">
                <c:choose>
                  <c:when test="${userPage.first}"><span class="btn secondary sm">← Trước</span></c:when>
                  <c:otherwise>
                    <c:url var="prevUrl" value="/admin/users"><c:param name="q" value="${q}"/><c:param name="role" value="${selectedRole}"/><c:param name="status" value="${selectedStatus}"/><c:param name="size" value="${pageSize}"/><c:param name="page" value="${userPage.number - 1}"/></c:url>
                    <a class="btn secondary sm" href="${prevUrl}">← Trước</a>
                  </c:otherwise>
                </c:choose>
                <c:choose>
                  <c:when test="${userPage.last}"><span class="btn secondary sm">Sau →</span></c:when>
                  <c:otherwise>
                    <c:url var="nextUrl" value="/admin/users"><c:param name="q" value="${q}"/><c:param name="role" value="${selectedRole}"/><c:param name="status" value="${selectedStatus}"/><c:param name="size" value="${pageSize}"/><c:param name="page" value="${userPage.number + 1}"/></c:url>
                    <a class="btn secondary sm" href="${nextUrl}">Sau →</a>
                  </c:otherwise>
                </c:choose>
              </div>
            </div>
          </c:if>
        </section>
      </div>
    </div>
  </div>
</main>
<%@ include file="_admin-footer.jspf" %>
</body>
</html>
