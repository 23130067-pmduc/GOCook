<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Chỉnh sửa người dùng | GO Cook</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css">
</head>
<body>
<%@ include file="_admin-header.jspf" %>
<main id="main">
  <div class="container">
    <div class="page-heading">
      <nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin/users">Người dùng</a><span>/</span><span>Chỉnh sửa</span></nav>
      <h1>Chỉnh sửa người dùng ND-${user.id}</h1>
      <p class="lead">Email được giữ nguyên vì đang là định danh đăng nhập.</p>
    </div>
    <div class="workspace">
      <%@ include file="_admin-sidebar.jspf" %>
      <div class="stack">
        <%@ include file="_admin-messages.jspf" %>
        <form class="card stack" method="post" action="${pageContext.request.contextPath}/admin/users/update">
          <input type="hidden" name="id" value="${user.id}">
          <label class="field">Tên hiển thị
            <input name="username" type="text" required maxlength="255" value="<c:out value='${user.username}'/>">
          </label>
          <label class="field">Email
            <input type="email" value="<c:out value='${user.email}'/>" readonly>
            <small>Không đổi email ở màn hình quản trị để tránh ảnh hưởng luồng đăng nhập.</small>
          </label>
          <label class="field">Vai trò
            <select name="role" required>
              <option value="USER" ${user.roleName eq 'USER' ? 'selected' : ''}>Khách hàng</option>
              <option value="INSTRUCTOR" ${user.roleName eq 'INSTRUCTOR' ? 'selected' : ''}>Người bán</option>
              <option value="ADMIN" ${user.roleName eq 'ADMIN' ? 'selected' : ''}>Quản trị viên</option>
              <option value="COMPANY_ADMIN" ${user.roleName eq 'COMPANY_ADMIN' ? 'selected' : ''}>Quản trị công ty</option>
            </select>
          </label>
          <label class="row">
            <input name="active" type="checkbox" value="true" ${user.active ? 'checked' : ''}>
            <span>Cho phép tài khoản hoạt động</span>
          </label>
          <div class="row">
            <button class="btn" type="submit">Lưu thay đổi</button>
            <a class="btn secondary" href="${pageContext.request.contextPath}/admin/users">Quay lại</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</main>
<%@ include file="_admin-footer.jspf" %>
</body>
</html>
