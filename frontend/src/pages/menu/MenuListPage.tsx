import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /menus
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function MenuListPage() {
  useDocumentTitle("Thực đơn có sẵn | GO Cook");

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
              {"Thực đơn cho mọi bữa sum vầy"}
            </span>
          </nav>
          <h1>
            {"Thực đơn cho mọi bữa sum vầy"}
          </h1>
          <p className={"lead"}>
            {"Chọn vị quen thuộc. Để đầu bếp lo phần còn lại."}
          </p>
        </div>
        <div className={"notice row"}>
          <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
            <path d={"M3 17h18M5 17a7 7 0 0 1 14 0M12 8V5m-2 0h4M4 21h16"}></path>
          </svg>
          {" Giá theo người · Bao gồm nguyên liệu, công nấu và dọn dẹp"}
        </div>
        <div className={"section workspace"}>
          <aside className={"card filter"} aria-label={"Bộ lọc thực đơn"}>
            <h3>
              {"Bộ lọc"}
            </h3>
            <fieldset>
              <legend>
                {"Loại thực đơn"}
              </legend>
              <label className={"check"}>
                <input type={"checkbox"} name={"south"} />
                <span>
                  {"Món miền Nam"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"vegetarian"} />
                <span>
                  {"Món chay"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"family"} />
                <span>
                  {"Bữa ăn gia đình"}
                </span>
              </label>
            </fieldset>
            <fieldset>
              <legend>
                {"Giá mỗi người"}
              </legend>
              <label className={"check"}>
                <input type={"checkbox"} name={"budget"} />
                <span>
                  {"Dưới 120.000đ"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"standard"} />
                <span>
                  {"120.000–200.000đ"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"premium"} />
                <span>
                  {"Trên 200.000đ"}
                </span>
              </label>
            </fieldset>
            <fieldset>
              <legend>
                {"Gian bếp"}
              </legend>
              <label className={"check"}>
                <input type={"checkbox"} name={"mai"} />
                <span>
                  {"Bếp Cô Mai"}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"an"} />
                <span>
                  {"Bếp An Nhiên"}
                </span>
              </label>
            </fieldset>
            <button className={"btn full"} type={"button"} data-action={"filter"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Áp dụng bộ lọc"}
            </button>
          </aside>
          <section>
            <div className={"toolbar"}>
              <strong>
                {"2 thực đơn gợi ý"}
              </strong>
              <label className={"small"}>
                {"Sắp xếp "}
                <select name={"sort"} aria-label={"Sắp xếp thực đơn"}>
                  <option>
                    {"Được yêu thích"}
                  </option>
                  <option>
                    {"Giá tăng dần"}
                  </option>
                  <option>
                    {"Giá giảm dần"}
                  </option>
                  <option>
                    {"Bán chạy nhất"}
                  </option>
                  <option>
                    {"Mới nhất"}
                  </option>
                  <option>
                    {"Xem nhiều nhất"}
                  </option>
                </select>
              </label>
            </div>
            <div className={"grid grid-2"}>
              <article className={"card media-card"}>
                <a href={"/menu-detail"} className={"media"}>
                  <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
                  <span className={"badge"}>
                    {"Món miền Nam"}
                  </span>
                </a>
                <div className={"card-body"}>
                  <div className={"between"}>
                    <span className={"small muted"}>
                      {"Bếp Cô Mai · 4 món"}
                    </span>
                    <span className={"small amber"}>
                      {"★ 4,9"}
                    </span>
                  </div>
                  <h3>
                    <a href={"/menu-detail"}>
                      {"Mâm Cơm Sum Vầy Miền Nam"}
                    </a>
                  </h3>
                  <p className={"small muted"}>
                    {"Cá kho tộ · Canh chua tôm · Rau muống xào · Thịt luộc"}
                  </p>
                  <div className={"between"}>
                    <span className={"price"}>
                      {"120.000đ"}
                      <small>
                        {" / người"}
                      </small>
                    </span>
                    <span className={"small muted"}>
                      {"4 người"}
                    </span>
                  </div>
                  <a className={"btn secondary full"} href={"/menu-detail"}>
                    {"Xem thực đơn"}
                  </a>
                </div>
              </article>
              <article className={"card media-card"}>
                <a href={"/menu-vegetarian"} className={"media"}>
                  <img className={""} src={"/assets/vegetarian.png"} alt={"Mâm cơm chay với đậu hũ, canh nấm, rau xào và gỏi cuốn"} loading={"lazy"} />
                  <span className={"badge"}>
                    {"Món chay"}
                  </span>
                </a>
                <div className={"card-body"}>
                  <div className={"between"}>
                    <span className={"small muted"}>
                      {"Bếp Cô Mai · 4 món"}
                    </span>
                    <span className={"small amber"}>
                      {"★ 4,9"}
                    </span>
                  </div>
                  <h3>
                    <a href={"/menu-vegetarian"}>
                      {"Mâm Chay Thanh Lành"}
                    </a>
                  </h3>
                  <p className={"small muted"}>
                    {"Đậu hũ sốt cà · Canh nấm · Rau xào · Gỏi cuốn"}
                  </p>
                  <div className={"between"}>
                    <span className={"price"}>
                      {"105.000đ"}
                      <small>
                        {" / người"}
                      </small>
                    </span>
                    <span className={"small muted"}>
                      {"4 người"}
                    </span>
                  </div>
                  <a className={"btn secondary full"} href={"/menu-vegetarian"}>
                    {"Xem thực đơn"}
                  </a>
                </div>
              </article>
            </div>
            <div className={"notice warm section"}>
              {"Bạn có khẩu vị riêng? "}
              <a className={"text-link"} href={"/request"}>
                {"Đặt theo ngân sách →"}
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
