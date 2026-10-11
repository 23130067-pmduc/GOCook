import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /success
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function CheckoutSuccessPage() {
  useDocumentTitle("Xác nhận đặt lịch mẫu | GO Cook");

  return (
    <>
      <div className={"stepper"}>
        <span className={""}>
          <b>
            {"1"}
          </b>
          {"Chọn thực đơn"}
        </span>
        <span className={""}>
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
        <span className={"current"}>
          <b>
            {"4"}
          </b>
          {"Xác nhận"}
        </span>
      </div>
      <div className={"container"}>
        <section className={"card empty"}>
          <span className={"icon-box"}>
            <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
              <path d={"m5 12 4 4L19 6"}></path>
            </svg>
          </span>
          <span className={"badge"}>
            {"Trạng thái minh họa"}
          </span>
          <h1>
            {"Lịch nấu đã được xác nhận"}
          </h1>
          <p className={"muted"}>
            {"Bếp Cô Mai sẽ chuẩn bị bữa tối cho gia đình bạn."}
          </p>
          <div className={"soft"}>
            <strong>
              {"Mâm Cơm Sum Vầy Miền Nam"}
            </strong>
            <p>
              {"4 người · 18:30 · 26/09/2026"}
            </p>
            <p className={"green"}>
              {"480.000đ"}
            </p>
          </div>
          <p className={"small muted"}>
            {"Đây là màn hình mẫu. Chưa có đơn hàng hay khoản thanh toán thực tế nào được tạo."}
          </p>
          <div className={"row"}>
            <a className={"btn"} href={"/orders"}>
              {"Xem đơn mẫu"}
            </a>
            <a className={"btn secondary"} href={"/"}>
              {"Về trang chủ"}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
