import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /seller/product-edit
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function SellerProductEditPage() {
  useDocumentTitle("Chỉnh sửa thực đơn | GO Cook");

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
              {"Chỉnh sửa thực đơn"}
            </span>
          </nav>
          <h1>
            {"Chỉnh sửa thực đơn"}
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
            <form className={"card stack"}>
              <h3>
                {"Thông tin thực đơn"}
              </h3>
              <label className={"field"} htmlFor={"product-name"}>
                {"Tên thực đơn"}
                <input id={"product-name"} name={"product-name"} type={"text"} defaultValue={"Mâm Cơm Sum Vầy Miền Nam"} placeholder={"Nhập tên thực đơn"} />
              </label>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"category"}>
                  {"Danh mục"}
                  <select id={"category"} name={"category"}>
                    <option>
                      {"Món miền Nam"}
                    </option>
                    <option>
                      {"Món miền Bắc"}
                    </option>
                    <option>
                      {"Món miền Trung"}
                    </option>
                    <option>
                      {"Món chay"}
                    </option>
                  </select>
                </label>
                <label className={"field"} htmlFor={"unit-price"}>
                  {"Giá mỗi người (đ)"}
                  <input id={"unit-price"} name={"unit-price"} type={"number"} defaultValue={"120000"} placeholder={""} min={"0"} step={"1000"} />
                </label>
                <label className={"field"} htmlFor={"min-guests"}>
                  {"Số người tối thiểu"}
                  <input id={"min-guests"} name={"min-guests"} type={"number"} defaultValue={"3"} placeholder={""} min={"1"} />
                </label>
                <label className={"field"} htmlFor={"max-guests"}>
                  {"Số người tối đa"}
                  <input id={"max-guests"} name={"max-guests"} type={"number"} defaultValue={"8"} placeholder={""} min={"1"} />
                </label>
              </div>
              <label className={"field"} htmlFor={"dish-items"}>
                {"Các món trong thực đơn"}
                <textarea id={"dish-items"} name={"dish-items"} placeholder={"Mỗi món một dòng"}>
                  {"Cá lóc kho tộ Canh chua tôm Rau muống xào tỏi Thịt luộc"}
                </textarea>
              </label>
              <label className={"field"} htmlFor={"description"}>
                {"Mô tả"}
                <textarea id={"description"} name={"description"} placeholder={"Giới thiệu hương vị, nguyên liệu và cách phục vụ..."}></textarea>
              </label>
              <label className={"field"} htmlFor={"product-image"}>
                {"Ảnh thực đơn"}
                <input id={"product-image"} name={"product-image"} type={"file"} defaultValue={""} placeholder={""} accept={"image/*"} />
              </label>
              <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
              <label className={"field"} htmlFor={"product-status"}>
                {"Trạng thái"}
                <select id={"product-status"} name={"product-status"}>
                  <option>
                    {"Đang hiển thị"}
                  </option>
                  <option>
                    {"Bản nháp"}
                  </option>
                  <option>
                    {"Tạm ẩn"}
                  </option>
                </select>
              </label>
              <div className={"row"}>
                <button className={"btn"} type={"button"} data-action={"save-product"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                  {"Lưu thực đơn"}
                </button>
                <a className={"btn secondary"} href={"/seller/products"}>
                  {"Hủy"}
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
