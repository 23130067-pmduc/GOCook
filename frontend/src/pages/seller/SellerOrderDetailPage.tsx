import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller/order-detail
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerOrderDetailPage() {
  useDocumentTitle("Chi tiết đơn #GC-260926 | GO Cook");

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
              {"Chi tiết đơn #GC-260926"}
            </span>
          </nav>
          <h1>
            {"Chi tiết đơn #GC-260926"}
          </h1>
          <p className={"lead"}>
            {"Bếp Cô Mai · Kênh người bán · Dữ liệu minh họa"}
          </p>
        </div>
        <div className={"workspace"}>
          <nav className={"card side-nav"} aria-label={"Quản lý"}>
            <p className={"eyebrow"}>
              {"Kênh người bán"}
            </p>
            <a href={"/seller"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <rect x={"3"} y={"3"} width={"7"} height={"7"} rx={"1"}></rect>
                <rect x={"14"} y={"3"} width={"7"} height={"7"} rx={"1"}></rect>
                <rect x={"3"} y={"14"} width={"7"} height={"7"} rx={"1"}></rect>
                <rect x={"14"} y={"14"} width={"7"} height={"7"} rx={"1"}></rect>
              </svg>
              {"Tổng quan"}
            </a>
            <a href={"/seller/products"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"M3 17h18M5 17a7 7 0 0 1 14 0M12 8V5m-2 0h4M4 21h16"}></path>
              </svg>
              {"Thực đơn của tôi"}
            </a>
            <a href={"/seller/orders"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <rect x={"3"} y={"5"} width={"18"} height={"16"} rx={"2"}></rect>
                <path d={"M7 3v4m10-4v4M3 10h18m-13 5h3"}></path>
              </svg>
              {"Đơn đặt nấu"}
            </a>
            <a href={"/seller/revenue"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"M4 3v18h17M8 17v-5m5 5V7m5 10V4"}></path>
              </svg>
              {"Doanh thu"}
            </a>
            <a href={"/seller/schedule"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <circle cx={"12"} cy={"12"} r={"9"}></circle>
                <path d={"M12 6v6l4 2"}></path>
              </svg>
              {"Lịch phục vụ"}
            </a>
            <a href={"/chat"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"M20 15a3 3 0 0 1-3 3H9l-6 3V6a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3z"}></path>
                <path d={"M7 8h9M7 12h6"}></path>
              </svg>
              {"Tin nhắn"}
            </a>
          </nav>
          <div className={"stack"}>
            <section className={"card stack"}>
              <h3>
                {"Mâm Cơm Sum Vầy Miền Nam"}
              </h3>
              <p>
                {"Khách hàng Ngọc Anh · 4 người · 26/09/2026, 18:30"}
              </p>
              <p className={"muted"}>
                {"Bếp Cô Mai · Bình Thạnh, TP. Hồ Chí Minh"}
              </p>
              <div className={"soft"}>
                {"Ít cay, để riêng nước chấm."}
              </div>
              <div>
                <div className={"summary-line"}>
                  <span>
                    {"Thực đơn · 4 người"}
                  </span>
                  <strong>
                    {"480.000đ"}
                  </strong>
                </div>
                <div className={"summary-line"}>
                  <span>
                    {"Phí nguyên liệu & công nấu"}
                  </span>
                  <span className={"green"}>
                    {"Đã bao gồm"}
                  </span>
                </div>
                <div className={"summary-line"}>
                  <span>
                    {"Dọn dẹp gian bếp"}
                  </span>
                  <span className={"green"}>
                    {"Đã bao gồm"}
                  </span>
                </div>
                <div className={"summary-line"}>
                  <span>
                    {"Ưu đãi"}
                  </span>
                  <span>
                    {"0đ"}
                  </span>
                </div>
                <div className={"summary-line total"}>
                  <span>
                    {"Tổng cộng"}
                  </span>
                  <strong>
                    {"480.000đ"}
                  </strong>
                </div>
              </div>
            </section>
            <form className={"card stack"}>
              <h3>
                {"Xử lý đơn đặt nấu"}
              </h3>
              <label className={"field"} htmlFor={"edit-order-status"}>
                {"Trạng thái đơn"}
                <select id={"edit-order-status"} name={"edit-order-status"}>
                  <option>
                    {"Đã xác nhận"}
                  </option>
                  <option>
                    {"Chờ xác nhận"}
                  </option>
                  <option>
                    {"Đang nấu"}
                  </option>
                  <option>
                    {"Hoàn thành"}
                  </option>
                  <option>
                    {"Đã hủy"}
                  </option>
                </select>
              </label>
              <label className={"field"} htmlFor={"order-internal-note"}>
                {"Ghi chú xử lý"}
                <textarea id={"order-internal-note"} name={"order-internal-note"} placeholder={"Thông tin cần lưu cho đơn đặt nấu"}></textarea>
              </label>
              <button className={"btn"} type={"button"} data-action={"save-order"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                {"Cập nhật đơn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
