<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Thêm thực đơn | GO Cook</title><link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css"></head>
<body><%@ include file="_admin-header.jspf" %>
<main id="main"><div class="container"><div class="page-heading"><nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin/products">Sản phẩm</a><span>/</span><span>Thêm mới</span></nav><h1>Thêm thực đơn</h1><p class="lead">Tạo sản phẩm mới và chọn trạng thái xuất bản phù hợp.</p></div>
<div class="workspace"><%@ include file="_admin-sidebar.jspf" %><div class="stack"><%@ include file="_admin-messages.jspf" %>
<c:set var="formAction" value="/admin/products/create"/><c:set var="formSubmitLabel" value="Lưu thực đơn"/>
<%@ include file="_admin-product-form.jspf" %>
</div></div></div></main>
<%@ include file="_admin-footer.jspf" %></body></html>
