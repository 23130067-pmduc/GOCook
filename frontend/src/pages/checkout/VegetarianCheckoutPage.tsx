import { useDocumentTitle } from '../../hooks/common/useDocumentTitle';

/**
 * Route: /checkout-vegetarian
 * Migrated from the former JSP demo markup into a dedicated React page.
 * Keep future business logic in hooks/clients for this domain, not inside the router.
 */
export function VegetarianCheckoutPage() {
  useDocumentTitle("Đặt lịch &amp; thanh toán | GO Cook");

  return (
    <>
      <div className={"stepper"}>
        <span className={""}>
          <b>
            {"1"}
          </b>
          {"Chọn thực đơn"}
        </span>
        <span className={""}>
          <b>
            {"2"}
          </b>
          {"Giỏ hàng"}
        </span>
        <span className={"current"}>
          <b>
            {"3"}
          </b>
          {"Thanh toán"}
        </span>
        <span className={""}>
          <b>
            {"4"}
          </b>
          {"Xác nhận"}
        </span>
      </div>
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
              {"Xác nhận lịch nấu"}
            </span>
          </nav>
          <h1>
            {"Xác nhận lịch nấu"}
          </h1>
          <p className={"lead"}>
            {"Một bước nữa để bữa cơm nhà được chuẩn bị chu đáo."}
          </p>
        </div>
        <div className={"split"}>
          <form className={"stack"}>
            <section className={"card stack"}>
              <h3>
                {"Thực đơn đã chọn"}
              </h3>
              <div className={"order-item"}>
                <img className={""} src={"/assets/vegetarian.png"} alt={"Mâm cơm chay với đậu hũ, canh nấm, rau xào và gỏi cuốn"} loading={"lazy"} />
                <div>
                  <h3>
                    {"Mâm Chay Thanh Lành"}
                  </h3>
                  <p className={"small muted"}>
                    {"Bếp Cô Mai · 4 món · 105.000đ/người"}
                  </p>
                  <p className={"small muted"}>
                    {"26/09/2026 · Bữa tối 18:30"}
                  </p>
                </div>
              </div>
            </section>
            <section className={"card stack"}>
              <h3>
                {"Địa chỉ & thời gian nấu"}
              </h3>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"customer"}>
                  {"Họ và tên"}
                  <input id={"customer"} name={"customer"} type={"text"} defaultValue={"Ngọc Anh"} placeholder={""} />
                </label>
                <label className={"field"} htmlFor={"phone"}>
                  {"Số điện thoại"}
                  <input id={"phone"} name={"phone"} type={"tel"} defaultValue={""} placeholder={"Nhập số điện thoại"} autoComplete={"tel"} />
                </label>
              </div>
              <label className={"field"} htmlFor={"address"}>
                {"Địa chỉ nấu ăn"}
                <input id={"address"} name={"address"} type={"text"} defaultValue={""} placeholder={"Số nhà, đường, phường, thành phố"} autoComplete={"street-address"} />
              </label>
              <div className={"grid grid-2"}>
                <label className={"field"} htmlFor={"order-date"}>
                  {"Ngày dùng bữa"}
                  <input id={"order-date"} name={"order-date"} type={"date"} defaultValue={"2026-09-26"} placeholder={""} />
                </label>
                <label className={"field"} htmlFor={"order-time"}>
                  {"Giờ dùng bữa"}
                  <select id={"order-time"} name={"order-time"}>
                    <option>
                      {"18:30"}
                    </option>
                    <option>
                      {"11:30"}
                    </option>
                  </select>
                </label>
              </div>
              <label className={"field"} htmlFor={"allergies"}>
                {"Khẩu vị & dị ứng thực phẩm"}
                <textarea id={"allergies"} name={"allergies"} placeholder={""}>
                  {"Nấu ít cay, để riêng nước chấm."}
                </textarea>
              </label>
            </section>
            <section className={"card stack"}>
              <h3>
                {"Phương thức thanh toán"}
              </h3>
              <label className={"payment-option"}>
                <input type={"radio"} name={"payment"} defaultValue={"0"} defaultChecked />
                <span>
                  <strong>
                    {"Thẻ ngân hàng"}
                  </strong>
                  <span className={"small muted"}>
                    {" · ATM / Visa / Mastercard"}
                  </span>
                </span>
              </label>
              <label className={"payment-option"}>
                <input type={"radio"} name={"payment"} defaultValue={"1"} />
                <span>
                  <strong>
                    {"Ví điện tử"}
                  </strong>
                  <span className={"small muted"}>
                    {" · MoMo / ZaloPay"}
                  </span>
                </span>
              </label>
              <label className={"payment-option"}>
                <input type={"radio"} name={"payment"} defaultValue={"2"} />
                <span>
                  <strong>
                    {"Chuyển khoản"}
                  </strong>
                  <span className={"small muted"}>
                    {" · Mã QR ngân hàng"}
                  </span>
                </span>
              </label>
            </section>
          </form>
          <aside className={"card summary stack"}>
            <h3>
              {"Tóm tắt đặt lịch"}
            </h3>
            <div>
              <div className={"summary-line"}>
                <span>
                  {"Thực đơn · 4 người"}
                </span>
                <strong>
                  {"420.000đ"}
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
                  {"420.000đ"}
                </strong>
              </div>
            </div>
            <label className={"field"} htmlFor={"voucher"}>
              {"Mã ưu đãi"}
              <input id={"voucher"} name={"voucher"} type={"text"} defaultValue={""} placeholder={"Nhập mã ưu đãi"} />
            </label>
            <button className={"btn secondary"} type={"button"} data-action={"apply-voucher"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Áp dụng"}
            </button>
            <label className={"check"}>
              <input type={"checkbox"} name={"agree"} />
              <span>
                {"Tôi đã xem thông tin đặt lịch và chính sách dịch vụ."}
              </span>
            </label>
            <button className={"btn"} type={"button"} data-action={"checkout"} disabled title={"Chức năng sẽ được tích hợp ở giai đoạn tiếp theo"}>
              {"Thanh toán 420.000đ"}
            </button>
            <a className={"text-link"} href={"/success-vegetarian"}>
              {"Xem màn hình xác nhận mẫu"}
            </a>
            <p className={"small muted"}>
              {"Chưa kết nối cổng thanh toán. Không nhập thông tin thẻ thật vào bản mẫu."}
            </p>
          </aside>
        </div>
      </div>
    </>
  );
}
