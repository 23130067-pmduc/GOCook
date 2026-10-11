import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /tracking
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function TrackingPage() {
  useDocumentTitle("Theo dõi tiến trình nấu | GO Cook");

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
              {"Bữa tối đang được chuẩn bị"}
            </span>
          </nav>
          <h1>
            {"Bữa tối đang được chuẩn bị"}
          </h1>
          <p className={"lead"}>
            {"Đơn #GC-260924 · Trạng thái minh họa, chưa cập nhật trực tiếp."}
          </p>
        </div>
        <div className={"split"}>
          <section className={"card stack"}>
            <div className={"between"}>
              <h2>
                {"Từ chợ đến mâm cơm"}
              </h2>
              <span className={"badge gold"}>
                {"Bước 3 / 5"}
              </span>
            </div>
            <ol className={"timeline"}>
              <li className={"done"}>
                <h3>
                  {"Đã xác nhận lịch"}
                </h3>
                <p className={"muted"}>
                  {"Bếp Cô Mai đã nhận lịch nấu."}
                </p>
              </li>
              <li className={"done"}>
                <h3>
                  {"Đã chuẩn bị nguyên liệu"}
                </h3>
                <p className={"muted"}>
                  {"Nguyên liệu được mua cho bữa ăn hôm nay."}
                </p>
              </li>
              <li className={"active"}>
                <h3>
                  {"Đang nấu tại bếp nhà"}
                </h3>
                <p className={"muted"}>
                  {"Đầu bếp đang chế biến cá kho và canh chua."}
                </p>
              </li>
              <li className={""}>
                <h3>
                  {"Bày món & dùng bữa"}
                </h3>
                <p className={"muted"}>
                  {"Dự kiến phục vụ lúc 18:30."}
                </p>
              </li>
              <li className={""}>
                <h3>
                  {"Dọn bếp & nghiệm thu"}
                </h3>
                <p className={"muted"}>
                  {"Kiểm tra bữa ăn và hoàn tất đơn đặt nấu."}
                </p>
              </li>
            </ol>
            <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
          </section>
          <aside className={"card summary stack"}>
            <div className={"row"}>
              <img className={"avatar"} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
              <div>
                <h3>
                  {"Bếp Cô Mai"}
                </h3>
                <p className={"small muted"}>
                  {"Đầu bếp phụ trách"}
                </p>
              </div>
            </div>
            <div className={"soft"}>
              <strong>
                {"Mâm cơm sum vầy"}
              </strong>
              <p>
                {"4 người · 480.000đ"}
              </p>
            </div>
            <a className={"btn full"} href={"/chat"}>
              {"Nhắn đầu bếp"}
            </a>
            <a className={"btn secondary full"} href={"/review"}>
              {"Xem màn hình nghiệm thu"}
            </a>
            <a className={"text-link"} href={"/help"}>
              {"Cần hỗ trợ?"}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
