import { Link } from 'react-router-dom';
import { AccountSidebar } from '../../components/account/AccountSidebar';
import { ROUTES } from '../../constants/routes';
import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /orders
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function OrdersPage() {
  useDocumentTitle("Đơn đặt nấu của tôi | GO Cook");

  return (
    <>
      <div className={"container"}>
        <div className={"page-heading"}>
          <nav className={"breadcrumb"} aria-label={"Đường dẫn"}>
            <Link to={ROUTES.HOME}>
              {"Trang chủ"}
            </Link>
            <span>
              {"/"}
            </span>
            <span>
              {"Những bữa cơm của bạn"}
            </span>
          </nav>
          <h1>
            {"Những bữa cơm của bạn"}
          </h1>
          <p className={"lead"}>
            {"Theo dõi lịch sắp tới và xem lại những lần đặt trước."}
          </p>
        </div>
        <div className={"workspace"}>
          <AccountSidebar active="orders" />
          <div className={"stack"}>
            <nav className={"tabs"} aria-label={"Trạng thái đơn"}>
              <a href={"#upcoming"}>
                {"Sắp tới"}
              </a>
              <a href={"#active"}>
                {"Đang nấu"}
              </a>
              <a href={"#completed"}>
                {"Hoàn thành"}
              </a>
            </nav>
            <article id={"upcoming"} className={"card stack"}>
              <div className={"between"}>
                <strong>
                  {"#GC-260926"}
                </strong>
                <span className={"badge"}>
                  {"Đã xác nhận"}
                </span>
              </div>
              <div className={"order-item"}>
                <img className={""} src={"/assets/meal.png"} alt={"Mâm cơm Việt với cá kho, canh chua, rau xào và thịt luộc"} loading={"lazy"} />
                <div>
                  <h3>
                    {"Mâm Cơm Sum Vầy Miền Nam"}
                  </h3>
                  <p className={"muted small"}>
                    {"Bếp Cô Mai · 4 người · 26/09/2026, 18:30"}
                  </p>
                </div>
              </div>
              <div className={"between"}>
                <span className={"price"}>
                  {"480.000đ"}
                </span>
                <div className={"row"}>
                  <Link className={"btn secondary sm"} to={ROUTES.ORDER_DETAIL}>
                    {"Chi tiết đơn"}
                  </Link>
                  <Link className={"btn sm"} to={ROUTES.CHAT}>
                    {"Nhắn đầu bếp"}
                  </Link>
                </div>
              </div>
            </article>
            <article id={"active"} className={"card stack"}>
              <div className={"between"}>
                <strong>
                  {"#GC-260924"}
                </strong>
                <span className={"badge gold"}>
                  {"Đang nấu"}
                </span>
              </div>
              <h3>
                {"Bữa tối sum vầy · 4 người"}
              </h3>
              <p className={"muted"}>
                {"Đầu bếp đang chế biến món ăn tại gian bếp của bạn."}
              </p>
              <div className={"between"}>
                <span className={"price"}>
                  {"480.000đ"}
                </span>
                <Link className={"btn sm"} to={ROUTES.TRACKING}>
                  {"Theo dõi tiến trình"}
                </Link>
              </div>
            </article>
            <article id={"completed"} className={"card stack"}>
              <div className={"between"}>
                <strong>
                  {"#GC-260920"}
                </strong>
                <span className={"badge gray"}>
                  {"Hoàn thành"}
                </span>
              </div>
              <h3>
                {"Mâm Chay Thanh Lành"}
              </h3>
              <p className={"muted"}>
                {"20/09/2026 · 4 người · Bếp Cô Mai"}
              </p>
              <div className={"between"}>
                <span className={"price"}>
                  {"420.000đ"}
                </span>
                <Link className={"btn secondary sm"} to={ROUTES.MENU_VEGETARIAN}>
                  {"Đặt lại thực đơn"}
                </Link>
              </div>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
