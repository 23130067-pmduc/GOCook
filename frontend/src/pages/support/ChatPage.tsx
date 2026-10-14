import { useEffect } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hooks/auth/useAuth';
import { useSellerDemo } from '../../contexts/SellerDemoContext';
import { displayDate, money, orderUrl } from '../seller/sellerMockData';
import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /chat
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function ChatPage() {
  const { isSeller, isAuthenticated } = useAuth();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);
  const { orders } = useSellerDemo();
  const [params] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const chefOrder = isSeller ? orders.find(order => order.id === params.get('orderId')) : undefined;
  const returnTo = chefOrder ? orderUrl(chefOrder.id) : isSeller ? '/seller' : isAuthenticated ? '/orders' : '/';
  const canGoBack = !chefOrder && location.key !== 'default';
  useDocumentTitle(isSeller ? 'Trò chuyện với khách hàng | GO Cook' : 'Trò chuyện với đầu bếp | GO Cook');

  return (
    <>
      <div className={"container"}>
        <div className={"page-heading"}>
          <div className="row">
            {canGoBack ? <button className="btn secondary sm" onClick={() => navigate(-1)}>← Quay lại trang trước</button> : <Link className="btn secondary sm" to={returnTo}>{chefOrder ? '← Quay lại chi tiết đơn' : isSeller ? '← Về kênh đầu bếp' : isAuthenticated ? '← Về đơn đặt nấu' : '← Về trang chủ'}</Link>}
            {chefOrder && <span className="small muted">Đơn {chefOrder.id}</span>}
          </div>
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
                    {chefOrder?.customer || "Bếp Cô Mai"}
                  </h3>
                  <p className={"small muted"}>
                    {chefOrder ? `Trao đổi về đơn ${chefOrder.id}` : "Trao đổi về bữa ăn của bạn"}
                  </p>
                </div>
              </div>
              <Link className="text-link" to={chefOrder ? returnTo : "/chef-detail"}>{chefOrder ? "Chi tiết đơn" : "Hồ sơ"}</Link>
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
              <input className={"input"} id={"message"} name={"message"} placeholder={isSeller ? "Nhắn tin với khách hàng..." : "Nhắn điều bạn muốn dặn đầu bếp..."} />
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
              {chefOrder?.menu || "Mâm Cơm Sum Vầy Miền Nam"}
            </h4>
            <p className={"small muted"}>
              {chefOrder ? `${chefOrder.guests} người · ${displayDate(chefOrder.date)} · ${chefOrder.time}` : "4 người · 24/09/2026 · 18:30"}
            </p>
            <div>
              <div className={"summary-line"}>
                <span>
                  {chefOrder ? `${chefOrder.serviceType === "MENU" ? "Thực đơn" : "Theo ngân sách"} · ${chefOrder.guests} người` : "Thực đơn · 4 người"}
                </span>
                <strong>
                  {chefOrder ? money(chefOrder.total) : "480.000đ"}
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
                  {chefOrder ? money(chefOrder.total) : "480.000đ"}
                </strong>
              </div>
            </div>
            <Link className="btn secondary" to={chefOrder ? returnTo : "/tracking"}>{chefOrder ? "Quay lại chi tiết đơn" : "Theo dõi đơn mẫu"}</Link>
          </aside>
        </div>
      </div>
    </>
  );
}
