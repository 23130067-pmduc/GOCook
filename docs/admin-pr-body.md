## Summary

Hoàn thành phần Admin quản lý cơ bản theo phân công: người dùng, sản phẩm/thực đơn và đơn hàng.

## Changes

- User management: search, role/status filters, pagination, edit role/name, lock/unlock, guard against self-lock and removing the last active admin.
- Product management: search, category/status filters, pagination, create/edit, Draft/Published/Hidden lifecycle, quick publish/hide action.
- Order management: search, status/date filters, pagination, detail view, internal notes, controlled status transitions.
- Admin dashboard: real user/product/order counts, completed-order revenue, recent orders.
- PostgreSQL schema + optional demo seed for Admin product/order data.
- Unit tests for order workflow and paging rules.

## Scope

Only the Admin assignment is changed. Customer, seller, auth and statistics logic are intentionally not modified.

## Integration note

Admin lock/unlock updates `users.is_active`. The current auth module does not yet reject inactive users during login/JWT authentication; that check should be integrated by the auth owner to avoid modifying another member's scope in this PR.

## Verification

- [ ] `./mvnw -DskipTests compile`
- [ ] `./mvnw test`
- [ ] Run `sql/admin_management.sql`
- [ ] Promote a local account with `sql/admin_promote_user.sql`
- [ ] Verify search/filter/pagination for users, products and orders
- [ ] Verify product Draft -> Published -> Hidden flow
- [ ] Verify order PENDING -> CONFIRMED -> COOKING -> COMPLETED flow
- [ ] Verify invalid order transitions are rejected
