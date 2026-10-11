import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller/revenue
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerRevenuePage() {
  useDocumentTitle("Doanh thu &amp; thống kê | GO Cook");

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
              {"Doanh thu & thống kê"}
            </span>
          </nav>
          <h1>
            {"Doanh thu & thống kê"}
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
            <a href={"/seller/revenue"} aria-current={"page"}>
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
              <label className={"field"} htmlFor={"from-date"}>
                {"Từ ngày"}
                <input id={"from-date"} name={"from-date"} type={"date"} defaultValue={"2026-09-01"} placeholder={""} />
              </label>
              <label className={"field"} htmlFor={"to-date"}>
                {"Đến ngày"}
                <input id={"to-date"} name={"to-date"} type={"date"} defaultValue={"2026-09-30"} placeholder={""} />
              </label>
              <div className={"field"}>
                <span></span>
                <button className={"btn"} type={"button"} data-action={"filter-statistics"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                  {"Xem thống kê"}
                </button>
              </div>
            </form>
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
            <div className={"grid grid-2"}>
              <figure className={"card stack-sm"}>
                <figcaption>
                  <h3>
                    {"Doanh thu theo tháng"}
                  </h3>
                  <p className={"small muted"}>
                    {"Triệu đồng · Số liệu minh họa"}
                  </p>
                </figcaption>
                <div className={"chart"} role={"img"} aria-label={"Biểu đồ doanh thu 6 tháng, số liệu được ghi trên từng cột"}>
                  <div className={"chart-col"}>
                    <span>
                      {"5.9"}
                    </span>
                    <div className={"bar h35"}></div>
                    <span>
                      {"T4"}
                    </span>
                  </div>
                  <div className={"chart-col"}>
                    <span>
                      {"8.1"}
                    </span>
                    <div className={"bar h48"}></div>
                    <span>
                      {"T5"}
                    </span>
                  </div>
                  <div className={"chart-col"}>
                    <span>
                      {"9.6"}
                    </span>
                    <div className={"bar h57"}></div>
                    <span>
                      {"T6"}
                    </span>
                  </div>
                  <div className={"chart-col"}>
                    <span>
                      {"11.1"}
                    </span>
                    <div className={"bar h66"}></div>
                    <span>
                      {"T7"}
                    </span>
                  </div>
                  <div className={"chart-col"}>
                    <span>
                      {"12.7"}
                    </span>
                    <div className={"bar h75"}></div>
                    <span>
                      {"T8"}
                    </span>
                  </div>
                  <div className={"chart-col"}>
                    <span>
                      {"14.85"}
                    </span>
                    <div className={"bar h88"}></div>
                    <span>
                      {"T9"}
                    </span>
                  </div>
                </div>
              </figure>
              <figure className={"card"}>
                <figcaption>
                  <h3>
                    {"Cơ cấu dịch vụ"}
                  </h3>
                  <p className={"small muted"}>
                    {"Tỷ trọng đơn đặt nấu mẫu"}
                  </p>
                </figcaption>
                <div className={"donut"} role={"img"} aria-label={"Thực đơn có sẵn 62%, theo ngân sách 38%"}>
                  <div>
                    <strong>
                      {"100%"}
                    </strong>
                    <small>
                      {"Đơn đặt nấu"}
                    </small>
                  </div>
                </div>
                <div className={"summary-line"}>
                  <span>
                    <i className={"legend-dot"}></i>
                    {"Thực đơn có sẵn"}
                  </span>
                  <strong>
                    {"62%"}
                  </strong>
                </div>
                <div className={"summary-line"}>
                  <span>
                    <i className={"legend-dot gold"}></i>
                    {"Theo ngân sách"}
                  </span>
                  <strong>
                    {"38%"}
                  </strong>
                </div>
              </figure>
            </div>
            <section className={"card"}>
              <h3>
                {"Giao dịch gần đây"}
              </h3>
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
