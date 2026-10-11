import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /chat
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function ChatPage() {
  useDocumentTitle("Trò chuyện với đầu bếp | GO Cook");

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
              {"Một lời dặn, bữa ăn vừa ý"}
            </span>
          </nav>
          <h1>
            {"Một lời dặn, bữa ăn vừa ý"}
          </h1>
          <p className={"lead"}>
            {"Trao đổi khẩu vị, nguyên liệu và thời gian phục vụ."}
          </p>
        </div>
        <div className={"split"}>
          <section className={"card chat-shell"}>
            <div className={"chat-top between"}>
              <div className={"row"}>
                <img className={"avatar"} src={"/assets/chef.png"} alt={"Ảnh minh họa đầu bếp nấu ăn tại nhà"} loading={"lazy"} />
                <div>
                  <h3>
                    {"Bếp Cô Mai"}
                  </h3>
                  <p className={"small muted"}>
                    {"Trao đổi về bữa ăn của bạn"}
                  </p>
                </div>
              </div>
              <a className={"text-link"} href={"/chef-detail"}>
                {"Hồ sơ"}
              </a>
            </div>
            <div className={"chat-stream"}>
              <p className={"small muted center"}>
                {"Hội thoại minh họa · 24/09/2026"}
              </p>
              <div className={"bubble mine"}>
                {"Chào cô Mai, bữa tối nhà mình có trẻ nhỏ, cô nấu ít cay giúp mình nhé."}
                <p className={"small muted"}>
                  {"16:45"}
                </p>
              </div>
              <div className={"bubble"}>
                {"Cô ghi chú rồi nhé. Cô sẽ để riêng ớt và nước chấm để cả nhà dùng vừa vị."}
                <p className={"small muted"}>
                  {"16:48"}
                </p>
              </div>
              <div className={"bubble mine"}>
                {"Cảm ơn cô, hẹn gặp cô chiều nay!"}
                <p className={"small muted"}>
                  {"16:50"}
                </p>
              </div>
            </div>
            <form className={"chat-compose"}>
              <label className={"sr-only"} htmlFor={"message"}>
                {"Tin nhắn"}
              </label>
              <input className={"input"} id={"message"} name={"message"} placeholder={"Nhắn điều bạn muốn dặn đầu bếp..."} />
              <button className={"btn sm"} type={"button"} data-action={"send-message"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
                {"Gửi"}
              </button>
            </form>
          </section>
          <aside className={"card summary stack"}>
            <h3>
              {"Bữa ăn đang trao đổi"}
            </h3>
            <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
            <h4>
              {"Mâm Cơm Sum Vầy Miền Nam"}
            </h4>
            <p className={"small muted"}>
              {"4 người · 24/09/2026 · 18:30"}
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
            <a className={"btn secondary"} href={"/tracking"}>
              {"Theo dõi đơn mẫu"}
            </a>
          </aside>
        </div>
      </div>
    </>
  );
}
