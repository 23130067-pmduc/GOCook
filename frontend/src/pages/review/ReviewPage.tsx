import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /review
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function ReviewPage() {
  useDocumentTitle("Nghiệm thu &amp; đánh giá | GO Cook");

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
              {"Bữa ăn hôm nay có vừa ý bạn?"}
            </span>
          </nav>
          <h1>
            {"Bữa ăn hôm nay có vừa ý bạn?"}
          </h1>
          <p className={"lead"}>
            {"Kiểm tra chất lượng phục vụ và chia sẻ với đầu bếp."}
          </p>
        </div>
        <div className={"split"}>
          <form className={"stack"}>
            <section className={"card stack"}>
              <h3>
                {"Kiểm tra sau bữa ăn"}
              </h3>
              <label className={"check"}>
                <input type={"checkbox"} name={"enough"} />
                <span>
                  {"Đủ món và đúng khẩu phần đã đặt."}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"quality"} />
                <span>
                  {"Nguyên liệu và món ăn đáp ứng yêu cầu."}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"clean"} />
                <span>
                  {"Gian bếp và dụng cụ đã được dọn sạch."}
                </span>
              </label>
              <label className={"check"}>
                <input type={"checkbox"} name={"hygiene"} />
                <span>
                  {"Đầu bếp giữ vệ sinh trong quá trình phục vụ."}
                </span>
              </label>
            </section>
            <section className={"card stack"}>
              <h3>
                {"Đánh giá trải nghiệm"}
              </h3>
              <fieldset>
                <legend>
                  {"Bạn hài lòng ở mức nào?"}
                </legend>
                <div className={"choices"}>
                  <label className={"choice"}>
                    <input type={"radio"} name={"rating"} defaultValue={"0"} defaultChecked />
                    <span>
                      {"5 ★"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"rating"} defaultValue={"1"} />
                    <span>
                      {"4 ★"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"rating"} defaultValue={"2"} />
                    <span>
                      {"3 ★"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"rating"} defaultValue={"3"} />
                    <span>
                      {"2 ★"}
                    </span>
                  </label>
                  <label className={"choice"}>
                    <input type={"radio"} name={"rating"} defaultValue={"4"} />
                    <span>
                      {"1 ★"}
                    </span>
                  </label>
                </div>
              </fieldset>
              <label className={"field"} htmlFor={"feedback"}>
                {"Nhận xét của bạn"}
                <textarea id={"feedback"} name={"feedback"} placeholder={"Điều gì khiến bữa ăn hôm nay trở nên đặc biệt?"}></textarea>
              </label>
              <label className={"field"} htmlFor={"review-photo"}>
                {"Ảnh bữa ăn"}
                <input id={"review-photo"} name={"review-photo"} type={"file"} defaultValue={""} placeholder={""} accept={"image/*"} multiple />
              </label>
            </section>
          </form>
          <aside className={"card summary stack"}>
            <h3>
              {"Hoàn tất bữa ăn"}
            </h3>
            <p className={"muted"}>
              {"Mâm cơm sum vầy miền Nam"}
              <br />
              {"Bếp Cô Mai · 4 người"}
            </p>
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
            <button className={"btn"} type={"button"} data-action={"complete-order"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Xác nhận nghiệm thu"}
            </button>
            <a className={"text-link"} href={"/help"}>
              {"Liên hệ khi cần hỗ trợ"}
            </a>
            <p className={"small muted"}>
              {"Chưa gửi đánh giá hoặc thay đổi trạng thái đơn."}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
