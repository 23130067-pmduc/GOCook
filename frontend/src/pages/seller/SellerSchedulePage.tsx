import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller/schedule
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerSchedulePage() {
  useDocumentTitle("Lịch phục vụ | GO Cook");

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
              {"Lịch phục vụ"}
            </span>
          </nav>
          <h1>
            {"Lịch phục vụ"}
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
            <a href={"/seller/schedule"} aria-current={"page"}>
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
              <div className={"between"}>
                <h3>
                  {"24–30 tháng 09, 2026"}
                </h3>
                <span className={"badge"}>
                  {"Lịch mẫu"}
                </span>
              </div>
              <div className={"calendar"}>
                <div className={"day"}>
                  <span>
                    {"T5"}
                  </span>
                  <strong>
                    {"24"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day busy"}>
                  <span>
                    {"T6"}
                  </span>
                  <strong>
                    {"25"}
                  </strong>
                  <span>
                    {"Đã kín"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"T7"}
                  </span>
                  <strong>
                    {"26"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"CN"}
                  </span>
                  <strong>
                    {"27"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day busy"}>
                  <span>
                    {"T2"}
                  </span>
                  <strong>
                    {"28"}
                  </strong>
                  <span>
                    {"Đã kín"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"T3"}
                  </span>
                  <strong>
                    {"29"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"T4"}
                  </span>
                  <strong>
                    {"30"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
              </div>
            </section>
            <form className={"card stack"}>
              <h3>
                {"Thiết lập lịch nhận nấu"}
              </h3>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"available-date"}>
                  {"Ngày phục vụ"}
                  <input id={"available-date"} name={"available-date"} type={"date"} defaultValue={""} placeholder={""} />
                </label>
                <label className={"field"} htmlFor={"available-slot"}>
                  {"Khung giờ"}
                  <select id={"available-slot"} name={"available-slot"}>
                    <option>
                      {"Bữa trưa · 11:30"}
                    </option>
                    <option>
                      {"Bữa tối · 18:30"}
                    </option>
                  </select>
                </label>
              </div>
              <label className={"check"}>
                <input type={"checkbox"} name={"available"} defaultChecked />
                <span>
                  {"Nhận đơn trong khung giờ này"}
                </span>
              </label>
              <button className={"btn"} type={"button"} data-action={"save-schedule"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                {"Lưu lịch phục vụ"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
