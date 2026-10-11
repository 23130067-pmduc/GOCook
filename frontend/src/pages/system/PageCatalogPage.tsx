import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /pages
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function PageCatalogPage() {
  useDocumentTitle("Danh mục màn hình | GO Cook");

  return (
    <>
      <div className={"container"}>
        <div className={"page-heading"}>
          <nav className={"breadcrumb"} aria-label={"Đường dẫn"}>
            <a href={"/"}>
              {"Trang chủ"}
            </a>
            <span>
              {"/"}
            </span>
            <span>
              {"Toàn bộ khung giao diện GO Cook"}
            </span>
          </nav>
          <h1>
            {"Toàn bộ khung giao diện GO Cook"}
          </h1>
          <p className={"lead"}>
            {"Chọn một trang để xem. Các màn hình dùng chung styles.css và tài nguyên trong assets."}
          </p>
        </div>
        <div className={"notice"}>
          {"HTML + CSS thuần · Không JavaScript · Form và dữ liệu là mẫu · Các nút xử lý nghiệp vụ đang tắt."}
        </div>
        <section className={"section grid grid-3"}>
          <div className={"card page-map"}>
            <h3>
              {"Khách hàng"}
            </h3>
            <a className={""} href={"/"}>
              {"Đầu bếp tại gia"}
            </a>
            <a className={""} href={"/menus"}>
              {"Thực đơn có sẵn"}
            </a>
            <a className={""} href={"/chefs"}>
              {"Khám phá đầu bếp"}
            </a>
            <a className={""} href={"/chef-detail"}>
              {"Bếp Cô Mai"}
            </a>
            <a className={""} href={"/chef-an-nhien"}>
              {"Bếp An Nhiên"}
            </a>
            <a className={""} href={"/menu-detail"}>
              {"Mâm Cơm Sum Vầy Miền Nam"}
            </a>
            <a className={""} href={"/menu-vegetarian"}>
              {"Mâm Chay Thanh Lành"}
            </a>
            <a className={""} href={"/cart"}>
              {"Giỏ hàng"}
            </a>
            <a className={""} href={"/checkout"}>
              {"Đặt lịch & thanh toán"}
            </a>
            <a className={""} href={"/success"}>
              {"Xác nhận đặt lịch mẫu"}
            </a>
            <a className={""} href={"/cart-vegetarian"}>
              {"Giỏ hàng"}
            </a>
            <a className={""} href={"/checkout-vegetarian"}>
              {"Đặt lịch & thanh toán"}
            </a>
            <a className={""} href={"/success-vegetarian"}>
              {"Xác nhận đặt lịch mẫu"}
            </a>
            <a className={""} href={"/cart-empty"}>
              {"Giỏ hàng trống"}
            </a>
            <a className={""} href={"/request"}>
              {"Tạo yêu cầu nấu ăn"}
            </a>
            <a className={""} href={"/quotes"}>
              {"Báo giá từ đầu bếp"}
            </a>
            <a className={""} href={"/matching"}>
              {"Gợi ý đầu bếp bằng AI"}
            </a>
            <a className={""} href={"/account"}>
              {"Hồ sơ tài khoản"}
            </a>
            <a className={""} href={"/orders"}>
              {"Đơn đặt nấu của tôi"}
            </a>
            <a className={""} href={"/order-detail"}>
              {"Chi tiết đơn đặt nấu"}
            </a>
            <a className={""} href={"/tracking"}>
              {"Theo dõi tiến trình nấu"}
            </a>
            <a className={""} href={"/chat"}>
              {"Trò chuyện với đầu bếp"}
            </a>
            <a className={""} href={"/review"}>
              {"Nghiệm thu & đánh giá"}
            </a>
            <a className={""} href={"/offers"}>
              {"Ưu đãi & khuyến mãi"}
            </a>
            <a className={""} href={"/help"}>
              {"Trung tâm trợ giúp"}
            </a>
            <a className={""} href={"/become-chef"}>
              {"Trở thành đầu bếp đối tác"}
            </a>
          </div>
          <div className={"card page-map"}>
            <h3>
              {"Tài khoản"}
            </h3>
            <a className={""} href={"/login"}>
              {"Đăng nhập"}
            </a>
            <a className={""} href={"/register"}>
              {"Đăng ký"}
            </a>
            <a className={""} href={"/forgot-password"}>
              {"Quên mật khẩu"}
            </a>
            <a className={""} href={"/reset-password"}>
              {"Đặt mật khẩu mới"}
            </a>
            <a className={""} href={"/verify-email"}>
              {"Xác nhận email"}
            </a>
            <a className={""} href={"/logout"}>
              {"Đăng xuất"}
            </a>
          </div>
          <div className={"card page-map"}>
            <h3>
              {"Người bán"}
            </h3>
            <a className={""} href={"/seller"}>
              {"Xin chào, Cô Mai"}
            </a>
            <a className={""} href={"/seller/products"}>
              {"Thực đơn của tôi"}
            </a>
            <a className={""} href={"/seller/orders"}>
              {"Quản lý đơn đặt nấu"}
            </a>
            <a className={""} href={"/seller/revenue"}>
              {"Doanh thu & thống kê"}
            </a>
            <a className={""} href={"/seller/schedule"}>
              {"Lịch phục vụ"}
            </a>
            <a className={""} href={"/seller/product-new"}>
              {"Thêm thực đơn"}
            </a>
            <a className={""} href={"/seller/product-edit"}>
              {"Chỉnh sửa thực đơn"}
            </a>
            <a className={""} href={"/seller/order-detail"}>
              {"Chi tiết đơn #GC-260926"}
            </a>
          </div>
          <div className={"card page-map"}>
            <h3>
              {"Quản trị"}
            </h3>
            <a className={""} href={"/admin"}>
              {"Tổng quan hệ thống"}
            </a>
            <a className={""} href={"/admin/users"}>
              {"Quản lý người dùng"}
            </a>
            <a className={""} href={"/admin/products"}>
              {"Quản lý sản phẩm"}
            </a>
            <a className={""} href={"/admin/orders"}>
              {"Quản lý đơn hàng"}
            </a>
            <a className={""} href={"/admin/statistics"}>
              {"Thống kê nền tảng"}
            </a>
            <a className={""} href={"/admin/product-new"}>
              {"Thêm thực đơn"}
            </a>
            <a className={""} href={"/admin/product-edit"}>
              {"Chỉnh sửa thực đơn"}
            </a>
            <a className={""} href={"/admin/user-edit"}>
              {"Chỉnh sửa người dùng"}
            </a>
            <a className={""} href={"/admin/order-detail"}>
              {"Chi tiết đơn #GC-260926"}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
