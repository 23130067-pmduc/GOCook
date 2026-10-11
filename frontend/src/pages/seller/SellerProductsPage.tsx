import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller/products
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerProductsPage() {
  useDocumentTitle("Thực đơn của tôi | GO Cook");

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
              {"Thực đơn của tôi"}
            </span>
          </nav>
          <h1>
            {"Thực đơn của tôi"}
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
            <a href={"/seller/products"} aria-current={"page"}>
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
            <div className={"between"}>
              <p className={"muted"}>
                {"Quản lý món ăn, giá và trạng thái hiển thị."}
              </p>
              <a className={"btn"} href={"/seller/product-new"}>
                {"+ Thêm thực đơn"}
              </a>
            </div>
            <section className={"card"}>
              <div className={"table-wrap"}>
                <table>
                  <caption>
                    {"Thực đơn của Bếp Cô Mai"}
                  </caption>
                  <thead>
                    <tr>
                      <th scope={"col"}>
                        {"Mã"}
                      </th>
                      <th scope={"col"}>
                        {"Thực đơn"}
                      </th>
                      <th scope={"col"}>
                        {"Giá / người"}
                      </th>
                      <th scope={"col"}>
                        {"Loại"}
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
                        {"MN-001"}
                      </td>
                      <td>
                        <a className={"text-link"} href={"/menu-detail"}>
                          {"Mâm Cơm Sum Vầy Miền Nam"}
                        </a>
                      </td>
                      <td>
                        {"120.000đ"}
                      </td>
                      <td>
                        {"Miền Nam"}
                      </td>
                      <td>
                        <span className={"badge"}>
                          {"Đang hiển thị"}
                        </span>
                      </td>
                      <td>
                        <div className={"row"}>
                          <a className={"text-link"} href={"/seller/product-edit"}>
                            {"Sửa"}
                          </a>
                          <button className={"btn ghost sm"} type={"button"} data-action={"hide-product"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                            {"Ẩn"}
                          </button>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {"MN-002"}
                      </td>
                      <td>
                        <a className={"text-link"} href={"/menu-vegetarian"}>
                          {"Mâm Chay Thanh Lành"}
                        </a>
                      </td>
                      <td>
                        {"105.000đ"}
                      </td>
                      <td>
                        {"Món chay"}
                      </td>
                      <td>
                        <span className={"badge"}>
                          {"Đang hiển thị"}
                        </span>
                      </td>
                      <td>
                        <div className={"row"}>
                          <a className={"text-link"} href={"/seller/product-edit"}>
                            {"Sửa"}
                          </a>
                          <button className={"btn ghost sm"} type={"button"} data-action={"hide-product"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                            {"Ẩn"}
                          </button>
                        </div>
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
