import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /quotes
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function QuotesPage() {
  useDocumentTitle("Báo giá từ đầu bếp | GO Cook");

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
              {"Đề xuất dành cho bữa ăn của bạn"}
            </span>
          </nav>
          <h1>
            {"Đề xuất dành cho bữa ăn của bạn"}
          </h1>
          <p className={"lead"}>
            {"Yêu cầu mẫu #YC-0021 · Bữa tối · 4 người · Ngân sách 400.000–600.000đ"}
          </p>
        </div>
        <div className={"split"}>
          <div className={"stack"}>
            <article className={"card stack"}>
              <div className={"between"}>
                <div className={"row"}>
                  <img className={"avatar"} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
                  <div>
                    <h3>
                      {"Bếp Cô Mai"}
                    </h3>
                    <p className={"small muted"}>
                      {"★ 4,9 · 12 năm kinh nghiệm"}
                    </p>
                  </div>
                </div>
                <span className={"badge"}>
                  {"Trong ngân sách"}
                </span>
              </div>
              <h3>
                {"Mâm cơm sum vầy miền Nam"}
              </h3>
              <p className={"muted"}>
                {"Cá kho tộ, canh chua tôm, rau muống xào tỏi và thịt luộc. Kèm cơm trắng, điều chỉnh ít cay theo yêu cầu."}
              </p>
              <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
              <div className={"between"}>
                <div className={"price"}>
                  {"480.000đ"}
                  <small>
                    {" / 4 người"}
                  </small>
                </div>
                <a className={"btn"} href={"/menu-detail"}>
                  {"Xem báo giá chi tiết"}
                </a>
              </div>
            </article>
            <article className={"card stack"}>
              <div className={"row"}>
                <span className={"avatar"}>
                  {"AN"}
                </span>
                <h3>
                  {"Bếp An Nhiên"}
                </h3>
                <span className={"badge gold"}>
                  {"Phương án món chay"}
                </span>
              </div>
              <p className={"muted"}>
                {"Mâm chay thanh lành gồm đậu hũ, canh nấm, rau xanh và gỏi cuốn."}
              </p>
              <div className={"between"}>
                <span className={"price"}>
                  {"420.000đ"}
                  <small>
                    {" / 4 người"}
                  </small>
                </span>
                <a className={"btn secondary"} href={"/menu-vegetarian"}>
                  {"Xem thực đơn chay"}
                </a>
              </div>
            </article>
          </div>
          <aside className={"card summary stack"}>
            <h3>
              {"Yêu cầu của bạn"}
            </h3>
            <div className={"summary-line"}>
              <span>
                {"Số người"}
              </span>
              <strong>
                {"4 người"}
              </strong>
            </div>
            <div className={"summary-line"}>
              <span>
                {"Ngân sách"}
              </span>
              <strong>
                {"400–600k"}
              </strong>
            </div>
            <div className={"summary-line"}>
              <span>
                {"Khẩu vị"}
              </span>
              <strong>
                {"Ít cay"}
              </strong>
            </div>
            <p className={"notice"}>
              {"Giá đề xuất đã gồm nguyên liệu, công nấu và dọn bếp."}
            </p>
            <a className={"btn secondary"} href={"/request"}>
              {"Chỉnh sửa yêu cầu"}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
