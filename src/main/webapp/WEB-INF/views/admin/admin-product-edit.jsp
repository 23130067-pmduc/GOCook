<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java" %>
<%@ taglib prefix="c" uri="jakarta.tags.core" %>
<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Chỉnh sửa thực đơn | GO Cook</title><link rel="stylesheet" href="${pageContext.request.contextPath}/css/styles.css"></head>
<body><%@ include file="_admin-header.jspf" %>
<main id="main"><div class="container"><div class="page-heading"><nav class="breadcrumb"><a href="${pageContext.request.contextPath}/admin/products">Sản phẩm</a><span>/</span><span>Chỉnh sửa</span></nav><h1>Chỉnh sửa ${product.displayCode}</h1><p class="lead">Cập nhật nội dung, giá và trạng thái xuất bản.</p></div>
<div class="workspace"><%@ include file="_admin-sidebar.jspf" %><div class="stack"><%@ include file="_admin-messages.jspf" %>
<c:set var="formAction" value="/admin/products/update"/><c:set var="formSubmitLabel" value="Lưu thay đổi"/>
<%@ include file="_admin-product-form.jspf" %>
</div></div></div></main>
<%@ include file="_admin-footer.jspf" %></body></html>
