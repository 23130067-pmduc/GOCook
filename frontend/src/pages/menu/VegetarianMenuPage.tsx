import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /menu-vegetarian
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function VegetarianMenuPage() {
  useDocumentTitle("Mâm Chay Thanh Lành | GO Cook");

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
            <a href={"/menus"}>
              {"Thực đơn"}
            </a>
            <span>
              {"/"}
            </span>
            <span>
              {"Mâm Chay Thanh Lành"}
            </span>
          </nav>
          <h1>
            {"Mâm Chay Thanh Lành"}
          </h1>
          <p className={"lead"}>
            {"Một bữa cơm 4 món, nấu nóng ngay tại gian bếp của bạn."}
          </p>
        </div>
        <div className={"gallery"}>
          <img className={""} src={"/assets/vegetarian.png"} alt={"Mâm cơm chay với đậu hũ, canh nấm, rau xào và gỏi cuốn"} fetchPriority={"high"} />
          <img className={""} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} fetchPriority={"high"} />
        </div>
        <div className={"split"}>
          <div className={"stack"}>
            <section className={"card detail-section"}>
              <div className={"row"}>
                <span className={"badge"}>
                  {"Món chay"}
                </span>
                <span className={"badge gray"}>
                  {"3–8 người"}
                </span>
                <span className={"badge gray"}>
                  {"90 phút"}
                </span>
              </div>
              <div className={"section"}>
                <h2>
                  {"Thực đơn gồm những gì?"}
                </h2>
                <ol className={"dish-list"}>
                  <li>
                    <span className={"dish-number"}>
                      {"01"}
                    </span>
                    <div>
                      <h4>
                        {"Đậu hũ sốt cà chua"}
                      </h4>
                      <p className={"small muted"}>
                        {"Đậu hũ mềm trong sốt cà chua tươi."}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={"dish-number"}>
                      {"02"}
                    </span>
                    <div>
                      <h4>
                        {"Canh nấm rau củ"}
                      </h4>
                      <p className={"small muted"}>
                        {"Nước canh ngọt từ nấm và rau củ theo mùa."}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={"dish-number"}>
                      {"03"}
                    </span>
                    <div>
                      <h4>
                        {"Rau xanh xào"}
                      </h4>
                      <p className={"small muted"}>
                        {"Rau tươi nấu vừa chín, giữ độ giòn."}
                      </p>
                    </div>
                  </li>
                  <li>
                    <span className={"dish-number"}>
                      {"04"}
                    </span>
                    <div>
                      <h4>
                        {"Gỏi cuốn rau củ"}
                      </h4>
                      <p className={"small muted"}>
                        {"Rau tươi cuốn bánh tráng, chấm sốt đậu phộng."}
                      </p>
                    </div>
                  </li>
                </ol>
              </div>
              <p className={"notice"}>
                {"Đã bao gồm cơm trắng, nguyên liệu, công nấu và dọn bếp."}
              </p>
            </section>
            <section className={"card row"}>
              <img className={"avatar large"} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
              <div>
                <p className={"eyebrow"}>
                  {"Người nấu bữa cơm của bạn"}
                </p>
                <h3>
                  {"Bếp Cô Mai"}
                </h3>
                <p className={"small muted"}>
                  {"Nguyễn Thị Mai · 12 năm kinh nghiệm"}
                </p>
                <a className={"text-link"} href={"/chef-detail"}>
                  {"Xem hồ sơ đầu bếp →"}
                </a>
              </div>
            </section>
            <section className={"card detail-section"}>
              <h3>
                {"Hỏi đáp về thực đơn"}
              </h3>
              <div className={"soft"}>
                <strong>
                  {"Thực đơn có thể nấu ít cay không?"}
                </strong>
                <p className={"small muted"}>
                  {"Bếp Cô Mai: Được bạn nhé. Hãy ghi chú khẩu vị khi đặt lịch để bếp chuẩn bị phù hợp."}
                </p>
              </div>
              <form className={"stack-sm section"}>
                <label className={"field"} htmlFor={"question"}>
                  {"Câu hỏi của bạn"}
                  <textarea id={"question"} name={"question"} placeholder={"Hỏi về nguyên liệu, khẩu vị hoặc cách chế biến..."}></textarea>
                </label>
                <button className={"btn"} type={"button"} data-action={"create-comment"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                  {"Gửi câu hỏi"}
                </button>
              </form>
              <p className={"small muted"}>
                {"Khu vực đặt câu hỏi về sản phẩm, tách biệt với đánh giá sau bữa ăn."}
              </p>
            </section>
            <section>
              <h2>
                {"Bạn có thể thích"}
              </h2>
              <div className={"section"}>
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
              </div>
            </section>
          </div>
          <aside className={"card summary stack"}>
            <div>
              <p className={"eyebrow"}>
                {"Chọn khẩu phần & lịch"}
              </p>
              <h3>
                {"Đặt thực đơn này"}
              </h3>
              <div className={"price"}>
                {"105.000đ"}
                <small>
                  {" / người"}
                </small>
              </div>
            </div>
            <form className={"stack"}>
              <label className={"field"} htmlFor={"diners"}>
                {"Số người ăn"}
                <input id={"diners"} name={"diners"} type={"number"} defaultValue={"4"} placeholder={""} min={"3"} max={"8"} />
              </label>
              <label className={"field"} htmlFor={"cook-date"}>
                {"Ngày nấu"}
                <input id={"cook-date"} name={"cook-date"} type={"date"} defaultValue={""} placeholder={""} />
              </label>
              <label className={"field"} htmlFor={"cook-slot"}>
                {"Khung giờ"}
                <select id={"cook-slot"} name={"cook-slot"}>
                  <option>
                    {"Bữa tối · 18:30"}
                  </option>
                  <option>
                    {"Bữa trưa · 11:30"}
                  </option>
                </select>
              </label>
              <div className={"soft"}>
                <div className={"summary-line"}>
                  <span>
                    {"Khẩu phần mẫu · 4 người"}
                  </span>
                  <strong>
                    {"420.000đ"}
                  </strong>
                </div>
                <div className={"summary-line"}>
                  <span>
                    {"Nguyên liệu & dọn bếp"}
                  </span>
                  <span className={"green"}>
                    {"Đã gồm"}
                  </span>
                </div>
                <div className={"summary-line total"}>
                  <span>
                    {"Tạm tính"}
                  </span>
                  <strong>
                    {"420.000đ"}
                  </strong>
                </div>
              </div>
              <button className={"btn"} type={"button"} data-action={"add-to-cart"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                {"Thêm vào giỏ hàng"}
              </button>
            </form>
            <a className={"btn secondary full"} href={"/cart-vegetarian"}>
              {"Xem giỏ hàng mẫu"}
            </a>
            <p className={"small muted"}>
              {"Khung giao diện chưa tính lại giá theo số người."}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
