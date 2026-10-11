import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /help
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function HelpPage() {
  useDocumentTitle("Trung tâm trợ giúp | GO Cook");

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
              {"Bạn cần hỗ trợ điều gì?"}
            </span>
          </nav>
          <h1>
            {"Bạn cần hỗ trợ điều gì?"}
          </h1>
          <p className={"lead"}>
            {"Tìm thông tin về đặt lịch, thực đơn và trải nghiệm nấu ăn tại nhà."}
          </p>
        </div>
        <div className={"split"}>
          <section className={"card"}>
            <h2>
              {"Câu hỏi thường gặp"}
            </h2>
            <details className={"faq"}>
              <summary>
                {"GO Cook giao đồ ăn hay nấu tại nhà?"}
              </summary>
              <p>
                {"Đây là dịch vụ đầu bếp đến nấu trực tiếp tại gian bếp của bạn. Thực đơn mẫu gồm nguyên liệu, công nấu và dọn dẹp."}
              </p>
            </details>
            <details className={"faq"}>
              <summary>
                {"Giá hiển thị tính cho bao nhiêu người?"}
              </summary>
              <p>
                {"Thực đơn có sẵn hiển thị giá mỗi người. Tổng tiền được tính theo số người và các khoản được xác nhận trước khi đặt."}
              </p>
            </details>
            <details className={"faq"}>
              <summary>
                {"Tôi có thể yêu cầu món ít cay hoặc tránh dị ứng không?"}
              </summary>
              <p>
                {"Bạn có thể ghi rõ yêu cầu trong phần ghi chú và trao đổi với đầu bếp trước khi xác nhận lịch."}
              </p>
            </details>
            <details className={"faq"}>
              <summary>
                {"Có thể hủy hoặc đổi lịch không?"}
              </summary>
              <p>
                {"Mục này là khung chính sách. Nhóm cần bổ sung thời hạn, điều kiện hủy và mức hoàn tiền theo mô hình dịch vụ đã chốt trước khi vận hành."}
              </p>
            </details>
            <details className={"faq"}>
              <summary>
                {"GO Cook có bảo hiểm hoặc ký quỹ không?"}
              </summary>
              <p>
                {"Các nội dung bảo hiểm, ký quỹ và bảo đảm thanh toán trong thiết kế gốc chưa được xác minh triển khai. Nhóm cần hoàn thiện chính sách và tích hợp đối tác trước khi công bố cam kết cụ thể."}
              </p>
            </details>
          </section>
          <form className={"card stack"}>
            <h3>
              {"Gửi yêu cầu hỗ trợ"}
            </h3>
            <label className={"field"} htmlFor={"support-email"}>
              {"Email liên hệ"}
              <input id={"support-email"} name={"support-email"} type={"email"} defaultValue={""} placeholder={"ban@example.com"} />
            </label>
            <label className={"field"} htmlFor={"support-topic"}>
              {"Chủ đề"}
              <select id={"support-topic"} name={"support-topic"}>
                <option>
                  {"Đặt lịch nấu ăn"}
                </option>
                <option>
                  {"Thanh toán"}
                </option>
                <option>
                  {"Thay đổi hoặc hủy lịch"}
                </option>
                <option>
                  {"Vấn đề khác"}
                </option>
              </select>
            </label>
            <label className={"field"} htmlFor={"support-message"}>
              {"Nội dung"}
              <textarea id={"support-message"} name={"support-message"} placeholder={"Mô tả vấn đề bạn gặp phải..."}></textarea>
            </label>
            <button className={"btn"} type={"button"} data-action={"support"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Gửi yêu cầu"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
