import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /cart
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function CartPage() {
  useDocumentTitle("Giỏ hàng | GO Cook");

  return (
    <>
      <div className={"stepper"}>
        <span className={""}>
          <b>
            {"1"}
          </b>
          {"Chọn thực đơn"}
        </span>
        <span className={"current"}>
          <b>
            {"2"}
          </b>
          {"Giỏ hàng"}
        </span>
        <span className={""}>
          <b>
            {"3"}
          </b>
          {"Thanh toán"}
        </span>
        <span className={""}>
          <b>
            {"4"}
          </b>
          {"Xác nhận"}
        </span>
      </div>
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
              {"Giỏ hàng của bạn"}
            </span>
          </nav>
          <h1>
            {"Giỏ hàng của bạn"}
          </h1>
          <p className={"lead"}>
            {"Xem lại bữa ăn trước khi đặt lịch."}
          </p>
        </div>
        <div className={"split"}>
          <section className={"card stack"}>
            <div className={"order-item"}>
              <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
              <div>
                <h3>
                  {"Mâm Cơm Sum Vầy Miền Nam"}
                </h3>
                <p className={"small muted"}>
                  {"Bếp Cô Mai · 4 món · 120.000đ/người"}
                </p>
                <p className={"small muted"}>
                  {"26/09/2026 · Bữa tối 18:30"}
                </p>
              </div>
            </div>
            <hr className={"divider"} />
            <div className={"between"}>
              <label className={"field"} htmlFor={"quantity"}>
                {"Số người"}
                <input id={"quantity"} name={"quantity"} type={"number"} defaultValue={"4"} placeholder={""} min={"3"} max={"8"} />
              </label>
              <button className={"btn secondary"} type={"button"} data-action={"update-cart"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                {"Cập nhật"}
              </button>
              <button className={"btn ghost"} type={"button"} data-action={"remove-item"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                {"Xóa khỏi giỏ"}
              </button>
            </div>
            <label className={"field"} htmlFor={"cart-note"}>
              {"Ghi chú cho đầu bếp"}
              <textarea id={"cart-note"} name={"cart-note"} placeholder={""}>
                {"Nấu ít cay, để riêng nước chấm."}
              </textarea>
            </label>
            <p className={"small muted"}>
              {"Số người và tổng tiền trong bản mẫu chưa tự đồng bộ."}
            </p>
            <a className={"text-link"} href={"/menus"}>
              {"Tiếp tục khám phá thực đơn"}
            </a>
          </section>
          <aside className={"card summary stack"}>
            <h3>
              {"Chi phí bữa ăn"}
            </h3>
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
            <a className={"btn full"} href={"/checkout"}>
              {"Tiếp tục đặt lịch"}
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"M4 12h15m-6-6 6 6-6 6"}></path>
              </svg>
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
