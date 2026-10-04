# GO Cook - Admin management

Phạm vi module này chỉ gồm phần được phân công cho Admin: **người dùng, sản phẩm/thực đơn và đơn hàng**. Module không thay đổi logic của auth, customer, seller hoặc statistics.

## Chức năng đã hoàn thành

### Người dùng

- Danh sách có phân trang 10/20/50 dòng.
- Tìm theo tên hiển thị hoặc email.
- Lọc theo vai trò và trạng thái hoạt động.
- Xem ngày tham gia.
- Chỉnh tên hiển thị và vai trò.
- Khóa/mở khóa bằng `users.is_active`.
- Không cho admin tự khóa/gỡ quyền admin của chính mình.
- Không cho hệ thống mất quản trị viên cuối cùng đang hoạt động.

### Sản phẩm / thực đơn

- Danh sách có phân trang 10/20/50 dòng.
- Tìm theo tên, mô tả hoặc món ăn.
- Lọc theo danh mục và trạng thái.
- Thêm và sửa thực đơn.
- Quản lý giá/người, số khách min/max, danh sách món, mô tả và URL ảnh.
- Ba trạng thái đúng với mockup: `PUBLISHED` (Đang hiển thị), `DRAFT` (Bản nháp), `HIDDEN` (Tạm ẩn).
- Nút nhanh Ẩn/Xuất bản ngay trên danh sách.

### Đơn hàng

- Danh sách có phân trang 10/20/50 dòng.
- Tìm theo mã đơn, khách hàng, email, thực đơn hoặc đầu bếp.
- Lọc theo trạng thái và khoảng ngày nấu.
- Xem chi tiết đơn, khách, đầu bếp, địa chỉ, tiền và ghi chú.
- Cập nhật ghi chú nội bộ.
- Kiểm soát transition trạng thái:
  - `PENDING -> CONFIRMED | CANCELLED`
  - `CONFIRMED -> COOKING | CANCELLED`
  - `COOKING -> COMPLETED | CANCELLED`
  - `COMPLETED` và `CANCELLED` là trạng thái kết thúc.

### Dashboard

- Tổng người dùng.
- Số sản phẩm đang xuất bản.
- Tổng đơn đặt nấu.
- Doanh thu từ đơn hoàn thành.
- 5 đơn mới nhất theo thời điểm tạo.

## Database

Project đang dùng PostgreSQL và không bật Hibernate auto-DDL, vì vậy cần chạy SQL theo thứ tự:

1. `sql/go_cook_base.sql` - schema user/role hiện có của project.
2. `sql/admin_management.sql` - thêm/cập nhật bảng `products` và `orders` cho phần Admin.
3. Tuỳ chọn: `sql/admin_demo_seed.sql` - dữ liệu mẫu để demo giao diện Admin.

`admin_management.sql` có phần migration tương thích với bản Admin trước: nếu bảng `products` đã tồn tại, script sẽ bổ sung cột `status` và chuyển dữ liệu `is_active` cũ sang `PUBLISHED/HIDDEN`.

Để tài khoản local có thể vào `/admin`, sửa email trong `sql/admin_promote_user.sql`, chạy file đó, sau đó đăng nhập lại để JWT mới chứa quyền `ROLE_SYSTEM_ADMIN`.

## Routes

- `GET /admin`
- `GET /admin/users?q=&role=&status=&page=&size=`
- `GET /admin/user-edit?id={id}`
- `POST /admin/users/update`
- `POST /admin/users/toggle`
- `GET /admin/products?q=&category=&status=&page=&size=`
- `GET /admin/product-new`
- `POST /admin/products/create`
- `GET /admin/product-edit?id={id}`
- `POST /admin/products/update`
- `POST /admin/products/toggle-visibility`
- `GET /admin/orders?q=&status=&from=&to=&page=&size=`
- `GET /admin/order-detail?id={id}`
- `POST /admin/orders/update`

Tất cả route trên được bảo vệ bởi `ROLE_SYSTEM_ADMIN`.

## Kiến trúc

Code Admin được chia theo domain để dễ đọc và dễ commit độc lập:

```text
com.james.LMS.admin
├── controller
│   ├── AdminDashboardController
│   ├── AdminUserController
│   ├── AdminProductController
│   └── AdminOrderController
├── dto
├── entity
├── enums
├── repository
├── service
└── util
```

Spring Data `Pageable` được dùng để search/filter trực tiếp tại database thay vì `findAll()` rồi lọc trong Java.

## Ranh giới với module khác

`AdminProduct` và `AdminOrder` nằm trong package `com.james.LMS.admin` để phần Admin không phải sửa controller/service của seller/customer. Hai entity ánh xạ vào bảng domain chung `products` và `orders`; khi team thống nhất domain chung, có thể refactor entity về package chung mà không cần đổi schema.

### Auth và khóa tài khoản

Admin lưu trạng thái khóa/mở vào `users.is_active`. Source auth hiện tại của nhóm chưa kiểm tra cờ này trong `UserDetailsAuthenticationProviderInterceptor` và `AuthTokenProviderInterceptor`. Theo yêu cầu không sửa phần của thành viên khác, module Admin không thay đổi hai file đó.

Khi tích hợp toàn nhóm, phía auth cần từ chối user có `is_active = false` ở bước đăng nhập và khi dựng principal từ JWT. Đây là dependency tích hợp duy nhất còn nằm ngoài phạm vi Admin.

## Kiểm tra local trước khi push

```bash
./mvnw -DskipTests compile
./mvnw test
```

Windows PowerShell:

```powershell
.\mvnw.cmd -DskipTests compile
.\mvnw.cmd test
```

Manual smoke test:

1. Vào `/admin` bằng tài khoản có `ROLE_SYSTEM_ADMIN`.
2. Thử search/filter/pagination ở Users, Products, Orders.
3. Thử tự khóa chính admin hiện tại: phải bị từ chối.
4. Tạo product ở trạng thái Draft, sau đó Publish/Hide.
5. Thử nhập minGuests > maxGuests: phải bị từ chối.
6. Thử lọc đơn theo khoảng ngày ngược nhau: phải báo lỗi.
7. Thử chuyển `PENDING -> COMPLETED`: không được phép.
8. Chuyển `PENDING -> CONFIRMED -> COOKING -> COMPLETED`: hợp lệ.
