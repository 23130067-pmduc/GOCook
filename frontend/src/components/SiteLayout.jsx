import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Brand } from './Brand';
import { useAuth } from './AuthContext';

export function SiteHeader() {
  const { profile, isAdmin } = useAuth();
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Brand />
        <nav className="nav" aria-label="Điều hướng chính">
          <NavLink to="/chefs">Khám phá đầu bếp</NavLink>
          <NavLink to="/menus">Thực đơn</NavLink>
          <NavLink to="/request">Tạo yêu cầu</NavLink>
          <NavLink to="/offers">Ưu đãi</NavLink>
          <NavLink to="/help">Trợ giúp</NavLink>
        </nav>
        <div className="header-actions">
          <Link className="icon-link" to="/cart" aria-label="Giỏ hàng">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 3h2l3 12h10l3-9H6" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" />
            </svg>
          </Link>
          {isAdmin && <Link className="text-link small" to="/admin">Trang quản trị</Link>}
          <Link className="login-link text-link small" to={profile ? '/account' : '/login'}>
            {profile?.username || 'Đăng nhập'}
          </Link>
          <Link className="btn sm" to="/chefs">Đặt đầu bếp</Link>
          <details className="mobile-menu">
            <summary aria-label="Mở menu">
              <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
            </summary>
            <nav aria-label="Điều hướng di động">
              <Link to="/chefs">Khám phá đầu bếp</Link><Link to="/menus">Thực đơn</Link>
              <Link to="/request">Tạo yêu cầu</Link><Link to="/offers">Ưu đãi</Link><Link to="/help">Trợ giúp</Link>
              <Link to="/account">Tài khoản</Link>{isAdmin && <Link to="/admin">Trang quản trị</Link>}
              <Link to={profile ? '/logout' : '/login'}>{profile ? 'Đăng xuất' : 'Đăng nhập'}</Link>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div><Brand /><p>Kết nối đầu bếp và gia đình Việt. Bữa cơm tươi ngon, được chăm chút ngay trong gian bếp của bạn.</p></div>
            <div><h4>Khám phá GO Cook</h4><Link to="/chefs">Đầu bếp tại gia</Link><Link to="/menus">Thực đơn có sẵn</Link><Link to="/request">Đặt theo ngân sách</Link><Link to="/offers">Ưu đãi hôm nay</Link></div>
            <div><h4>Dành cho bạn</h4><Link to="/orders">Đơn đặt nấu</Link><Link to="/account">Tài khoản của tôi</Link><Link to="/become-chef">Trở thành đầu bếp</Link><Link to="/seller">Kênh người bán</Link></div>
            <div><h4>Hỗ trợ & thông tin</h4><Link to="/help">Câu hỏi thường gặp</Link><Link to="/chat">Liên hệ hỗ trợ</Link><Link to="/admin">Kênh quản trị</Link><Link to="/pages">Danh mục màn hình</Link></div>
          </div>
          <div className="footer-bottom"><span>© 2026 GO Cook · Nhóm 2-1</span><span>Frontend React · Backend Spring Boot</span></div>
        </div>
      </footer>
      <Link className="help-float" to="/chat" aria-label="Mở trò chuyện">
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z" /><path d="M7 8h9M7 12h6" /></svg>
      </Link>
    </>
  );
}

export function SiteLayout({ children }) {
  return <><a className="skip" href="#main">Đến nội dung chính</a><SiteHeader />{children}<SiteFooter /></>;
}
