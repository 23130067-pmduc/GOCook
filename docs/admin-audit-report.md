# Admin final audit report

## Assigned scope

> Admin quản lý cơ bản: người dùng, sản phẩm, đơn hàng.

This final package intentionally implements only that scope plus the Admin dashboard needed to navigate and summarize those modules.

## Coverage matrix

| Area | List | Search | Filter | Pagination | Create | Edit | State action | Detail |
|---|---|---|---|---|---|---|---|---|
| Users | Yes | Name/email | Role, active status | 10/20/50 | No (registration owns creation) | Name, role, active status | Lock/unlock | Edit screen |
| Products | Yes | Name/description/dishes | Category, lifecycle status | 10/20/50 | Yes | Yes | Publish/hide + Draft state | Edit screen |
| Orders | Yes | Code/customer/email/product/chef | Status, date range | 10/20/50 | No (customer booking flow owns creation) | Status/internal note | Controlled status transitions | Yes |

## Important business rules

- Admin cannot lock or remove their own Admin role.
- The last active system Admin cannot be disabled/demoted.
- Product lifecycle: Draft / Published / Hidden.
- Product guest range must be valid and price cannot be negative.
- Order date filter rejects `from > to`.
- Order transitions are constrained to the normal booking workflow.
- Completed/Cancelled orders cannot be reopened from the Admin UI.

## Scope intentionally not implemented

- User registration/reset-password/auth changes.
- Seller product/order/revenue logic.
- Customer cart/checkout/booking creation.
- Admin statistics page/business charts.
- Chef identity/ATTP verification, complaints, escrow settlement and promotions shown in broader GO Cook concept mockups.

Those features belong to other assignments or the separate statistics scope. They are not required for the assigned basic Admin CRUD/management item.

## Integration caveat

Admin lock/unlock writes to `users.is_active`. The current team auth code does not yet enforce this flag when authenticating requests. No auth file was changed in this package in order to respect ownership boundaries.

## Static verification performed

- No duplicate Admin request mappings detected.
- Every Admin POST form action maps to an existing POST controller route.
- Product/order enum values match the PostgreSQL schema values.
- Users, products and orders use Spring Data `Pageable` rather than loading all rows then filtering in Java.
- Final package was rebuilt from the original uploaded ZIP and only Admin-owned files plus `PageController` routing integration differ.
- `SecurityConfig`, auth code, seller/customer code and statistics pages were not modified.
- Java parser pass via `javac` found no Java syntax errors; missing-library errors are expected without Maven dependencies.

## Build verification still required locally

The sandbox could not download Maven 3.9.12 from Maven Central, so a full Spring compile/test cannot be truthfully marked as passed here.

Run before push:

```powershell
.\mvnw.cmd -DskipTests compile
.\mvnw.cmd test
```
