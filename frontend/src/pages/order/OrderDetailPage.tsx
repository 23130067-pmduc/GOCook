import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /order-detail
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function OrderDetailPage() {
  useDocumentTitle("Chi tiết đơn đặt nấu | GO Cook");

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
            <a href={"/orders"}>
              {"Đơn đặt nấu"}
            </a>
            <span>
              {"/"}
            </span>
            <span>
              {"Đơn đặt nấu #GC-260926"}
            </span>
          </nav>
          <h1>
            {"Đơn đặt nấu #GC-260926"}
          </h1>
          <p className={"lead"}>
            {"Đã xác nhận · 26/09/2026"}
          </p>
        </div>
        <div className={"split"}>
          <div className={"stack"}>
            <section className={"card stack"}>
              <div className={"order-item"}>
                <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
                <div>
                  <h3>
                    {"Mâm Cơm Sum Vầy Miền Nam"}
                  </h3>
                  <p className={"muted"}>
                    {"Bếp Cô Mai · 4 người · 4 món"}
                  </p>
                </div>
              </div>
              <hr className={"divider"} />
              <div className={"grid grid-2"}>
                <div>
                  <p className={"small muted"}>
                    {"Lịch dùng bữa"}
                  </p>
                  <strong>
                    {"26/09/2026 · 18:30"}
                  </strong>
                </div>
                <div>
                  <p className={"small muted"}>
                    {"Khu vực nấu"}
                  </p>
                  <strong>
                    {"Bình Thạnh, TP. Hồ Chí Minh"}
                  </strong>
                </div>
              </div>
              <div className={"soft"}>
                {"Ghi chú: ít cay, để riêng nước chấm."}
              </div>
            </section>
            <section className={"card stack"}>
              <h3>
                {"Đầu bếp phụ trách"}
              </h3>
              <div className={"row"}>
                <img className={"avatar"} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
                <strong>
                  {"Nguyễn Thị Mai · Bếp Cô Mai"}
                </strong>
              </div>
              <div className={"row"}>
                <a className={"btn secondary"} href={"/chat"}>
                  {"Nhắn tin"}
                </a>
                <a className={"text-link"} href={"/tracking"}>
                  {"Theo dõi đơn đang nấu mẫu"}
                </a>
              </div>
            </section>
          </div>
          <aside className={"card summary stack"}>
            <h3>
              {"Chi phí đặt lịch"}
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
            <span className={"badge"}>
              {"Đã thanh toán · Dữ liệu mẫu"}
            </span>
            <button className={"btn secondary"} type={"button"} data-action={"cancel-order"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Yêu cầu hủy lịch"}
            </button>
            <a className={"text-link"} href={"/help"}>
              {"Xem chính sách dịch vụ"}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
