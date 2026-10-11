import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /matching
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function MatchingPage() {
  useDocumentTitle("Gợi ý đầu bếp bằng AI | GO Cook");

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
              {"Tìm người hợp vị với gia đình"}
            </span>
          </nav>
          <h1>
            {"Tìm người hợp vị với gia đình"}
          </h1>
          <p className={"lead"}>
            {"Khung tìm kiếm bằng AI — kết quả bên dưới là dữ liệu minh họa."}
          </p>
        </div>
        <form className={"card stack"}>
          <p className={"eyebrow"}>
            {"Bạn kể chuyện bữa ăn, GO Cook gợi ý"}
          </p>
          <label className={"field"} htmlFor={"ai-prompt"}>
            {"Mô tả bữa ăn bạn muốn"}
            <textarea id={"ai-prompt"} name={"ai-prompt"} placeholder={""}>
              {"Tôi cần bữa tối miền Nam cho 4 người tại Bình Thạnh, ít cay, khoảng 500.000đ."}
            </textarea>
          </label>
          <button className={"btn"} type={"button"} data-action={"ai-search"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
            {"Tìm đầu bếp phù hợp"}
          </button>
        </form>
        <section className={"section stack"}>
          <div className={"between"}>
            <h2>
              {"Gợi ý phù hợp"}
            </h2>
            <span className={"badge"}>
              {"Minh họa kết quả AI"}
            </span>
          </div>
          <article className={"card chef-card"}>
            <img className={""} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
            <div className={"card-body"}>
              <div className={"between"}>
                <span className={"badge"}>
                  {"Đầu bếp nổi bật"}
                </span>
                <span className={"small amber"}>
                  {"★ 4,9 "}
                  <span className={"muted"}>
                    {"(186 đánh giá)"}
                  </span>
                </span>
              </div>
              <div>
                <h3>
                  {"Bếp Cô Mai"}
                </h3>
                <p className={"small muted"}>
                  {"Nguyễn Thị Mai · 12 năm kinh nghiệm"}
                </p>
              </div>
              <p className={"small"}>
                {"Chăm chút hương vị miền Nam, từ nồi cá kho đến bát canh chua quen thuộc."}
              </p>
              <div className={"row small muted"}>
                <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                  <path d={"M19 10c0 6-7 11-7 11S5 16 5 10a7 7 0 0 1 14 0z"}></path>
                  <circle cx={"12"} cy={"10"} r={"2"}></circle>
                </svg>
                {" Bình Thạnh · Phú Nhuận "}
                <span className={"badge gray"}>
                  {"Có lịch trống"}
                </span>
              </div>
              <div className={"between"}>
                <span className={"price"}>
                  {"120.000đ"}
                  <small>
                    {" / người"}
                  </small>
                </span>
                <a className={"btn sm"} href={"/chef-detail"}>
                  {"Xem gian bếp"}
                </a>
              </div>
            </div>
          </article>
          <div className={"grid grid-3"}>
            <div className={"soft"}>
              <strong>
                {"Đúng khu vực"}
              </strong>
              <p className={"small muted"}>
                {"Bình Thạnh, TP. Hồ Chí Minh"}
              </p>
            </div>
            <div className={"soft"}>
              <strong>
                {"Đúng khẩu vị"}
              </strong>
              <p className={"small muted"}>
                {"Ẩm thực miền Nam, ít cay"}
              </p>
            </div>
            <div className={"soft"}>
              <strong>
                {"Trong ngân sách"}
              </strong>
              <p className={"small muted"}>
                {"480.000đ cho 4 người"}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
