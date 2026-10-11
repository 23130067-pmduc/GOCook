import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller/orders
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerOrdersPage() {
  useDocumentTitle("Quản lý đơn đặt nấu | GO Cook");

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
              {"Quản lý đơn đặt nấu"}
            </span>
          </nav>
          <h1>
            {"Quản lý đơn đặt nấu"}
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
            <a href={"/seller/orders"} aria-current={"page"}>
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
            <form className={"card grid grid-3"}>
              <label className={"field"} htmlFor={"order-search"}>
                {"Tìm mã đơn"}
                <input id={"order-search"} name={"order-search"} type={"text"} defaultValue={""} placeholder={"#GC-..."} />
              </label>
              <label className={"field"} htmlFor={"order-status"}>
                {"Trạng thái"}
                <select id={"order-status"} name={"order-status"}>
                  <option>
                    {"Tất cả"}
                  </option>
                  <option>
                    {"Chờ xác nhận"}
                  </option>
                  <option>
                    {"Đã xác nhận"}
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
              <div className={"field"}>
                <span></span>
                <button className={"btn"} type={"button"} data-action={"filter-orders"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                  {"Lọc đơn"}
                </button>
              </div>
            </form>
            <section className={"card"}>
              <div className={"table-wrap"}>
                <table>
                  <caption>
                    {"Danh sách đơn mẫu"}
                  </caption>
                  <thead>
                    <tr>
                      <th scope={"col"}>
                        {"Mã đơn"}
                      </th>
                      <th scope={"col"}>
                        {"Khách hàng"}
                      </th>
                      <th scope={"col"}>
                        {"Thực đơn"}
                      </th>
                      <th scope={"col"}>
                        {"Ngày nấu"}
                      </th>
                      <th scope={"col"}>
                        {"Tổng tiền"}
                      </th>
                      <th scope={"col"}>
                        {"Trạng thái"}
                      </th>
                      <th scope={"col"}>
                        {"Thao tác"}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <strong>
                          {"#GC-260926"}
                        </strong>
                      </td>
                      <td>
                        {"Ngọc Anh"}
                      </td>
                      <td>
                        {"Mâm cơm sum vầy"}
                      </td>
                      <td>
                        {"26/09/2026"}
                      </td>
                      <td>
                        {"480.000đ"}
                      </td>
                      <td>
                        <span className={"badge"}>
                          {"Đã xác nhận"}
                        </span>
                      </td>
                      <td>
                        <a className={"text-link"} href={"/seller/order-detail"}>
                          {"Chi tiết"}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          {"#GC-260924"}
                        </strong>
                      </td>
                      <td>
                        {"Minh Thư"}
                      </td>
                      <td>
                        {"Mâm cơm sum vầy"}
                      </td>
                      <td>
                        {"24/09/2026"}
                      </td>
                      <td>
                        {"480.000đ"}
                      </td>
                      <td>
                        <span className={"badge gold"}>
                          {"Đang nấu"}
                        </span>
                      </td>
                      <td>
                        <a className={"text-link"} href={"/seller/order-detail"}>
                          {"Chi tiết"}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>
                          {"#GC-260920"}
                        </strong>
                      </td>
                      <td>
                        {"Thanh Hà"}
                      </td>
                      <td>
                        {"Mâm chay thanh lành"}
                      </td>
                      <td>
                        {"20/09/2026"}
                      </td>
                      <td>
                        {"420.000đ"}
                      </td>
                      <td>
                        <span className={"badge gray"}>
                          {"Hoàn thành"}
                        </span>
                      </td>
                      <td>
                        <a className={"text-link"} href={"/seller/order-detail"}>
                          {"Chi tiết"}
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
