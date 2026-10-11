import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /chef-detail
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function ChefDetailPage() {
  useDocumentTitle("Bếp Cô Mai | GO Cook");

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
            <a href={"/chefs"}>
              {"Đầu bếp"}
            </a>
            <span>
              {"/"}
            </span>
            <span>
              {"Gian bếp của Cô Mai"}
            </span>
          </nav>
          <h1>
            {"Gian bếp của Cô Mai"}
          </h1>
        </div>
        <section className={"profile-cover row"}>
          <img className={"profile-photo"} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
          <div>
            <div className={"row"}>
              <span className={"badge"}>
                {"Đầu bếp đối tác"}
              </span>
              <span className={"badge gold"}>
                {"Ẩm thực miền Nam"}
              </span>
            </div>
            <h2>
              {"Bếp Cô Mai"}
            </h2>
            <p className={"muted"}>
              {"Bình Thạnh · Phú Nhuận, TP. Hồ Chí Minh"}
            </p>
            <p className={"small amber"}>
              {"★ 4,9 · 186 đánh giá"}
            </p>
          </div>
        </section>
        <div className={"split"}>
          <div className={"stack"}>
            <nav className={"tabs"} aria-label={"Nội dung hồ sơ"}>
              <a href={"#intro"}>
                {"Giới thiệu"}
              </a>
              <a href={"#menu"}>
                {"Thực đơn"}
              </a>
              <a href={"#schedule"}>
                {"Lịch phục vụ"}
              </a>
            </nav>
            <section className={"card detail-section"} id={"intro"}>
              <h2>
                {"Hương vị từ sự tận tâm"}
              </h2>
              <p className={"muted"}>
                {"Tôi tin rằng một bữa cơm ngon bắt đầu từ sự chăm chút. Với 12 năm đứng bếp, tôi mang hương vị miền Nam thân thuộc đến bữa ăn của gia đình bạn."}
              </p>
              <div className={"section"}>
                <div className={"trust-row"}>
                  <span>
                    <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                      <path d={"M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7z"}></path>
                      <path d={"M7 16h10M10 11v2m4-2v2"}></path>
                    </svg>
                    {" Đầu bếp nấu tại nhà"}
                  </span>
                  <span>
                    <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                      <path d={"M3 17h18M5 17a7 7 0 0 1 14 0M12 8V5m-2 0h4M4 21h16"}></path>
                    </svg>
                    {" Nguyên liệu tươi mỗi bữa"}
                  </span>
                  <span>
                    <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                      <path d={"m5 12 4 4L19 6"}></path>
                    </svg>
                    {" Dọn bếp sau khi nấu"}
                  </span>
                </div>
              </div>
            </section>
            <section id={"menu"} className={"detail-section"}>
              <h2>
                {"Thực đơn của gian bếp"}
              </h2>
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
            </section>
            <section className={"card detail-section"} id={"schedule"}>
              <h3>
                {"Lịch phục vụ trong tuần"}
              </h3>
              <p className={"small muted"}>
                {"Lịch mẫu · 24–30/09/2026"}
              </p>
              <div className={"calendar"}>
                <div className={"day"}>
                  <span>
                    {"T5"}
                  </span>
                  <strong>
                    {"24"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day busy"}>
                  <span>
                    {"T6"}
                  </span>
                  <strong>
                    {"25"}
                  </strong>
                  <span>
                    {"Đã kín"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"T7"}
                  </span>
                  <strong>
                    {"26"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"CN"}
                  </span>
                  <strong>
                    {"27"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day busy"}>
                  <span>
                    {"T2"}
                  </span>
                  <strong>
                    {"28"}
                  </strong>
                  <span>
                    {"Đã kín"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"T3"}
                  </span>
                  <strong>
                    {"29"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
                <div className={"day"}>
                  <span>
                    {"T4"}
                  </span>
                  <strong>
                    {"30"}
                  </strong>
                  <span>
                    {"Còn lịch"}
                  </span>
                </div>
              </div>
            </section>
          </div>
          <aside className={"card summary stack"}>
            <h3>
              {"Mời đầu bếp về nhà"}
            </h3>
            <span className={"price"}>
              {"120.000đ"}
              <small>
                {" / người"}
              </small>
            </span>
            <label className={"field"} htmlFor={"booking-date"}>
              {"Ngày dùng bữa"}
              <input id={"booking-date"} name={"booking-date"} type={"date"} defaultValue={""} placeholder={""} />
            </label>
            <label className={"field"} htmlFor={"booking-time"}>
              {"Bữa ăn"}
              <select id={"booking-time"} name={"booking-time"}>
                <option>
                  {"Bữa trưa · 11:30"}
                </option>
                <option>
                  {"Bữa tối · 18:30"}
                </option>
              </select>
            </label>
            <a className={"btn full"} href={"/menu-detail"}>
              {"Chọn thực đơn"}
            </a>
            <a className={"btn secondary full"} href={"/chat"}>
              {"Nhắn tin với đầu bếp"}
            </a>
            <p className={"small muted"}>
              {"Bạn sẽ xem lại chi phí và thông tin trước khi thanh toán."}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
