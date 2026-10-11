import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /cart-empty
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function EmptyCartPage() {
  useDocumentTitle("Giỏ hàng trống | GO Cook");

  return (
    <>
      <div className={"container"}>
        <section className={"card empty"}>
          <span className={"icon-box"}>
            <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
              <path d={"M3 3h2l3 12h10l3-9H6"}></path>
              <circle cx={"9"} cy={"20"} r={"1"}></circle>
              <circle cx={"18"} cy={"20"} r={"1"}></circle>
            </svg>
          </span>
          <h1>
            {"Giỏ hàng đang đợi món ngon"}
          </h1>
          <p className={"muted"}>
            {"Chọn một thực đơn để bắt đầu lên lịch bữa cơm nhà."}
          </p>
          <a className={"btn"} href={"/menus"}>
            {"Khám phá thực đơn"}
          </a>
        </section>
      </div>
    </>
  );
}
