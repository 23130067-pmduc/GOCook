import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /offers
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function OffersPage() {
  useDocumentTitle("Ưu đãi &amp; khuyến mãi | GO Cook");

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
              {"Thêm niềm vui cho bữa cơm nhà"}
            </span>
          </nav>
          <h1>
            {"Thêm niềm vui cho bữa cơm nhà"}
          </h1>
          <p className={"lead"}>
            {"Mã ưu đãi minh họa, chưa áp dụng cho giao dịch thực tế."}
          </p>
        </div>
        <div className={"dark-banner"}>
          <p className={"eyebrow"}>
            {"Bữa cơm đầu tiên"}
          </p>
          <h2>
            {"Gặp đầu bếp mới."}
            <br />
            {"Thêm một hương vị thân quen."}
          </h2>
          <p>
            {"Khám phá ưu đãi dành cho thành viên GO Cook."}
          </p>
        </div>
        <section className={"section grid grid-3"}>
          <article className={"voucher"}>
            <span className={"badge"}>
              {"Thành viên mới"}
            </span>
            <strong>
              {"Giảm 100k"}
            </strong>
            <h3>
              {"Chào bữa cơm đầu tiên"}
            </h3>
            <p className={"muted small"}>
              {"Đơn từ 600.000đ · Áp dụng một lần cho tài khoản mới."}
            </p>
            <span className={"code"}>
              {"GOFIRST100"}
            </span>
            <button className={"btn secondary"} type={"button"} data-action={"save-voucher"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Lưu mã ưu đãi"}
            </button>
          </article>
          <article className={"voucher"}>
            <span className={"badge"}>
              {"Cuối tuần"}
            </span>
            <strong>
              {"Giảm 10%"}
            </strong>
            <h3>
              {"Cả nhà cùng sum vầy"}
            </h3>
            <p className={"muted small"}>
              {"Tối đa 80.000đ · Đơn từ 500.000đ."}
            </p>
            <span className={"code"}>
              {"SUMVAY10"}
            </span>
            <button className={"btn secondary"} type={"button"} data-action={"save-voucher"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Lưu mã ưu đãi"}
            </button>
          </article>
          <article className={"voucher"}>
            <span className={"badge"}>
              {"Món chay"}
            </span>
            <strong>
              {"Giảm 50k"}
            </strong>
            <h3>
              {"Một bữa ăn thanh lành"}
            </h3>
            <p className={"muted small"}>
              {"Thực đơn chay từ 400.000đ."}
            </p>
            <span className={"code"}>
              {"CHAY50"}
            </span>
            <button className={"btn secondary"} type={"button"} data-action={"save-voucher"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Lưu mã ưu đãi"}
            </button>
          </article>
        </section>
      </div>
    </>
  );
}
