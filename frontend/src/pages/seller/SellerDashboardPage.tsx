import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerDashboardPage() {
  useDocumentTitle("Xin chào, Cô Mai | GO Cook");

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
              {"Xin chào, Cô Mai"}
            </span>
          </nav>
          <h1>
            {"Xin chào, Cô Mai"}
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
            <a href={"/seller"} aria-current={"page"}>
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
            <div className={"grid grid-4"}>
              <article className={"card metric"}>
                <p className={"small muted"}>
                  {"Doanh thu tháng"}
                </p>
                <p className={"value green"}>
                  {"14,85 triệu"}
                </p>
                <span className={"small muted"}>
                  {"Tháng 09/2026"}
                </span>
              </article>
              <article className={"card metric"}>
                <p className={"small muted"}>
                  {"Đơn hoàn thành"}
                </p>
                <p className={"value green"}>
                  {"31"}
                </p>
                <span className={"small muted"}>
                  {"Trong tháng này"}
                </span>
              </article>
              <article className={"card metric"}>
                <p className={"small muted"}>
                  {"Lịch sắp tới"}
                </p>
                <p className={"value green"}>
                  {"6"}
                </p>
                <span className={"small muted"}>
                  {"7 ngày tiếp theo"}
                </span>
              </article>
              <article className={"card metric"}>
                <p className={"small muted"}>
                  {"Đánh giá"}
                </p>
                <p className={"value green"}>
                  {"4,9 / 5"}
                </p>
                <span className={"small muted"}>
                  {"186 đánh giá"}
                </span>
              </article>
            </div>
            <section className={"card stack"}>
              <div className={"between"}>
                <div>
                  <p className={"eyebrow"}>
                    {"Lịch nấu hôm nay"}
                  </p>
                  <h3>
                    {"Mâm cơm sum vầy · 4 người"}
                  </h3>
                </div>
                <span className={"badge gold"}>
                  {"Đang chế biến"}
                </span>
              </div>
              <p className={"muted"}>
                {"Khách hàng Minh Thư · Bình Thạnh · 18:30"}
              </p>
              <div className={"row"}>
                <a className={"btn"} href={"/tracking"}>
                  {"Xem tiến trình"}
                </a>
                <a className={"btn secondary"} href={"/chat"}>
                  {"Nhắn khách hàng"}
                </a>
                <button className={"btn secondary"} type={"button"} data-action={"update-order"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                  {"Cập nhật trạng thái"}
                </button>
              </div>
            </section>
            <section className={"card stack"}>
              <div className={"between"}>
                <h3>
                  {"Đơn đặt nấu gần đây"}
                </h3>
                <a className={"text-link"} href={"/seller/orders"}>
                  {"Xem tất cả"}
                </a>
              </div>
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
            <section className={"card stack"}>
              <h3>
                {"Lịch phục vụ 7 ngày"}
              </h3>
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
              <a className={"text-link"} href={"/seller/schedule"}>
                {"Quản lý lịch phục vụ →"}
              </a>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
