import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /request
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function CookingRequestPage() {
  useDocumentTitle("Tạo yêu cầu nấu ăn | GO Cook");

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
              {"Một bữa ăn đúng ý bạn"}
            </span>
          </nav>
          <h1>
            {"Một bữa ăn đúng ý bạn"}
          </h1>
          <p className={"lead"}>
            {"Chia sẻ khẩu vị, số người và ngân sách. Đầu bếp sẽ lên thực đơn phù hợp."}
          </p>
        </div>
        <div className={"split"}>
          <form className={"stack"}>
            <section className={"card stack"}>
              <div>
                <p className={"eyebrow"}>
                  {"Bước 01"}
                </p>
                <h3>
                  {"Bạn muốn ăn gì?"}
                </h3>
              </div>
              <label className={"field"} htmlFor={"desired-dishes"}>
                {"Món ăn mong muốn"}
                <textarea id={"desired-dishes"} name={"desired-dishes"} placeholder={""}>
                  {"Cá kho tộ, canh chua tôm, rau muống xào tỏi, thịt luộc."}
                </textarea>
              </label>
              <fieldset>
                <legend>
                  {"Phong cách ẩm thực"}
                </legend>
                <div className={"choices"}>
                  <label className={"choice"}>
                    <input type={"radio"} name={"cuisine"} defaultValue={"0"} defaultChecked />
                    <span>
                      {"Miền Nam"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"cuisine"} defaultValue={"1"} />
                    <span>
                      {"Miền Bắc"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"cuisine"} defaultValue={"2"} />
                    <span>
                      {"Miền Trung"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"cuisine"} defaultValue={"3"} />
                    <span>
                      {"Món chay"}
                    </span>
                  </label>
                </div>
              </fieldset>
            </section>
            <section className={"card stack"}>
              <div>
                <p className={"eyebrow"}>
                  {"Bước 02"}
                </p>
                <h3>
                  {"Khẩu phần & khẩu vị"}
                </h3>
              </div>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"adults"}>
                  {"Số người lớn"}
                  <input id={"adults"} name={"adults"} type={"number"} defaultValue={"4"} placeholder={""} min={"1"} />
                </label>
                <label className={"field"} htmlFor={"children"}>
                  {"Số trẻ em"}
                  <input id={"children"} name={"children"} type={"number"} defaultValue={"0"} placeholder={""} min={"0"} />
                </label>
              </div>
              <label className={"field"} htmlFor={"avoid"}>
                {"Dị ứng hoặc thực phẩm cần tránh"}
                <textarea id={"avoid"} name={"avoid"} placeholder={"Ví dụ: dị ứng đậu phộng, không dùng hải sản..."}></textarea>
              </label>
              <fieldset>
                <legend>
                  {"Mức độ cay"}
                </legend>
                <div className={"choices"}>
                  <label className={"choice"}>
                    <input type={"radio"} name={"spice"} defaultValue={"0"} defaultChecked />
                    <span>
                      {"Không cay"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"spice"} defaultValue={"1"} />
                    <span>
                      {"Ít cay"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"spice"} defaultValue={"2"} />
                    <span>
                      {"Vừa"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"spice"} defaultValue={"3"} />
                    <span>
                      {"Cay"}
                    </span>
                  </label>
                </div>
              </fieldset>
            </section>
            <section className={"card stack"}>
              <div>
                <p className={"eyebrow"}>
                  {"Bước 03"}
                </p>
                <h3>
                  {"Thời gian & gian bếp"}
                </h3>
              </div>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"request-date"}>
                  {"Ngày dùng bữa"}
                  <input id={"request-date"} name={"request-date"} type={"date"} defaultValue={""} placeholder={""} />
                </label>
                <label className={"field"} htmlFor={"meal-time"}>
                  {"Bữa ăn"}
                  <select id={"meal-time"} name={"meal-time"}>
                    <option>
                      {"Bữa tối"}
                    </option>
                    <option>
                      {"Bữa trưa"}
                    </option>
                  </select>
                </label>
              </div>
              <label className={"field"} htmlFor={"kitchen-address"}>
                {"Địa chỉ"}
                <input id={"kitchen-address"} name={"kitchen-address"} type={"text"} defaultValue={""} placeholder={"Địa chỉ nơi đầu bếp sẽ đến nấu"} />
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"equipment"} />
                <span>
                  {"Gian bếp có bếp nấu, nồi chảo và dụng cụ cơ bản."}
                </span>
              </label>
            </section>
            <section className={"card stack"}>
              <div>
                <p className={"eyebrow"}>
                  {"Bước 04"}
                </p>
                <h3>
                  {"Ngân sách của bạn"}
                </h3>
              </div>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"budget-min"}>
                  {"Tối thiểu (đ)"}
                  <input id={"budget-min"} name={"budget-min"} type={"number"} defaultValue={"400000"} placeholder={""} min={"0"} step={"50000"} />
                </label>
                <label className={"field"} htmlFor={"budget-max"}>
                  {"Tối đa (đ)"}
                  <input id={"budget-max"} name={"budget-max"} type={"number"} defaultValue={"600000"} placeholder={""} min={"0"} step={"50000"} />
                </label>
              </div>
              <p className={"notice"}>
                {"Ngân sách cho toàn bộ bữa ăn, bao gồm nguyên liệu và công nấu."}
              </p>
              <div className={"upload"}>
                <label className={"field"} htmlFor={"reference-photo"}>
                  {"Ảnh tham khảo món ăn"}
                  <input id={"reference-photo"} name={"reference-photo"} type={"file"} defaultValue={""} placeholder={""} accept={"image/*"} />
                </label>
              </div>
            </section>
          </form>
          <aside className={"card summary stack"}>
            <span className={"icon-box"}>
              <svg className={"icon"} viewBox={"0 0 24 24"} aria-hidden={"true"}>
                <path d={"M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7z"}></path>
                <path d={"M7 16h10M10 11v2m4-2v2"}></path>
              </svg>
            </span>
            <h3>
              {"Bữa cơm riêng của gia đình"}
            </h3>
            <ul className={"check-list"}>
              <li>
                {"Tự chọn món mong muốn"}
              </li>
              <li>
                {"Điều chỉnh theo dị ứng, khẩu vị"}
              </li>
              <li>
                {"Xem báo giá trước khi quyết định"}
              </li>
            </ul>
            <button className={"btn"} type={"button"} data-action={"create-request"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Gửi yêu cầu nấu ăn"}
            </button>
            <a className={"btn secondary full"} href={"/quotes"}>
              {"Xem báo giá mẫu"}
            </a>
            <a className={"text-link"} href={"/matching"}>
              {"Xem gợi ý đầu bếp bằng AI"}
            </a>
            <p className={"small muted"}>
              {"Thông tin trên form chưa được gửi đi."}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
