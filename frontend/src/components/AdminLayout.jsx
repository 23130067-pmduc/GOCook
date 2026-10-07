import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brand } from './Brand';

export function AdminLayout({ title, lead, children }) {
  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <Brand admin />
          <nav className="nav" aria-label="Điều hướng quản trị">
            <NavLink end to="/admin">Tổng quan</NavLink><NavLink to="/admin/users">Người dùng</NavLink>
            <NavLink to="/admin/products">Sản phẩm</NavLink><NavLink to="/admin/orders">Đơn hàng</NavLink>
          </nav>
          <div className="header-actions"><Link className="btn secondary sm" to="/">Về trang chủ</Link></div>
        </div>
      </header>
      <main id="main"><div className="container">
        <div className="page-heading"><nav className="breadcrumb"><Link to="/admin">Quản trị</Link><span>/</span><span>{title}</span></nav><h1>{title}</h1>{lead && <p className="lead">{lead}</p>}</div>
        <div className="workspace">
          <nav className="card side-nav" aria-label="Quản lý"><p className="eyebrow">Quản trị hệ thống</p>
            <NavLink end to="/admin">Tổng quan</NavLink><NavLink to="/admin/users">Người dùng</NavLink><NavLink to="/admin/products">Sản phẩm</NavLink><NavLink to="/admin/orders">Đơn hàng</NavLink><NavLink to="/admin/statistics">Thống kê</NavLink>
          </nav>
          <div className="stack">{children}</div>
        </div>
      </div></main>
      <footer className="site-footer"><div className="container"><div className="footer-bottom"><span>© 2026 GO Cook · Nhóm 2-1</span><span>Kênh quản trị React</span></div></div></footer>
    </>
  );
}
