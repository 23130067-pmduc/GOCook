import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /chefs
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function ChefListPage() {
  useDocumentTitle("Khám phá đầu bếp | GO Cook");

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
              {"Đầu bếp cho bữa cơm nhà bạn"}
            </span>
          </nav>
          <h1>
            {"Đầu bếp cho bữa cơm nhà bạn"}
          </h1>
          <p className={"lead"}>
            {"Khám phá gian bếp, thực đơn và câu chuyện của những người yêu nấu ăn."}
          </p>
        </div>
        <div className={"workspace"}>
          <aside className={"card filter"}>
            <h3>
              {"Tìm đầu bếp"}
            </h3>
            <label className={"field"} htmlFor={"shop-search"}>
              {"Tên gian bếp"}
              <input id={"shop-search"} name={"shop-search"} type={"text"} defaultValue={""} placeholder={"Bếp Cô Mai..."} />
            </label>
            <fieldset>
              <legend>
                {"Khu vực"}
              </legend>
              <label className={"check"}>
                <input type={"checkbox"} name={"binh-thanh"} />
                <span>
                  {"Bình Thạnh"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"phu-nhuan"} />
                <span>
                  {"Phú Nhuận"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"thu-duc"} />
                <span>
                  {"Thủ Đức"}
                </span>
              </label>
            </fieldset>
            <fieldset>
              <legend>
                {"Sở trường"}
              </legend>
              <label className={"check"}>
                <input type={"checkbox"} name={"southern"} />
                <span>
                  {"Ẩm thực miền Nam"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"vegan"} />
                <span>
                  {"Món chay"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"party"} />
                <span>
                  {"Tiệc gia đình"}
                </span>
              </label>
            </fieldset>
            <label className={"field"} htmlFor={"price"}>
              {"Giá phục vụ"}
              <select id={"price"} name={"price"}>
                <option>
                  {"Tất cả mức giá"}
                </option>
                <option>
                  {"Dưới 150.000đ/người"}
                </option>
                <option>
                  {"Từ 150.000đ/người"}
                </option>
              </select>
            </label>
            <button className={"btn full"} type={"button"} data-action={"search-shop"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Tìm gian bếp"}
            </button>
          </aside>
          <section className={"stack"}>
            <div className={"between"}>
              <h3>
                {"Đầu bếp gợi ý"}
              </h3>
              <span className={"badge gray"}>
                {"TP. Hồ Chí Minh"}
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
            <article className={"card chef-card"}>
              <div className={"initial-portrait"} aria-label={"Ảnh đầu bếp chưa cập nhật"}>
                {"AN"}
              </div>
              <div className={"card-body"}>
                <div className={"between"}>
                  <span className={"badge"}>
                    {"Chuyên món chay"}
                  </span>
                  <span className={"small amber"}>
                    {"★ 4,8 "}
                    <span className={"muted"}>
                      {"(64 đánh giá)"}
                    </span>
                  </span>
                </div>
                <div>
                  <h3>
                    {"Bếp An Nhiên"}
                  </h3>
                  <p className={"small muted"}>
                    {"Bếp chay gia đình · 6 năm kinh nghiệm"}
                  </p>
                </div>
                <p className={"small"}>
                  {"Thực đơn rau củ theo mùa, nhẹ nhàng và cân bằng."}
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
                    {"105.000đ"}
                    <small>
                      {" / người"}
                    </small>
                  </span>
                  <a className={"btn sm"} href={"/chef-an-nhien"}>
                    {"Xem gian bếp"}
                  </a>
                </div>
              </div>
            </article>
            <div className={"notice"}>
              {"Chưa biết chọn ai? "}
              <a className={"text-link"} href={"/matching"}>
                {"Gợi ý đầu bếp theo nhu cầu →"}
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
