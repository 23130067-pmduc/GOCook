# Admin commit plan

Run these commands from the repository root after copying the final patch.

## Commit 1 - backend + schema

```bash
git add src/main/java/com/james/LMS/admin \
        src/main/java/com/james/LMS/controller/PageController.java \
        sql/admin_management.sql \
        sql/admin_promote_user.sql
git commit -m "feat(admin): implement management backend and schema"
```

## Commit 2 - JSP views

```bash
git add src/main/webapp/WEB-INF/views/admin/admin.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-users.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-user-edit.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-products.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-product-new.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-product-edit.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-orders.jsp \
        src/main/webapp/WEB-INF/views/admin/admin-order-detail.jsp \
        src/main/webapp/WEB-INF/views/admin/_admin-header.jspf \
        src/main/webapp/WEB-INF/views/admin/_admin-sidebar.jspf \
        src/main/webapp/WEB-INF/views/admin/_admin-footer.jspf \
        src/main/webapp/WEB-INF/views/admin/_admin-messages.jspf \
        src/main/webapp/WEB-INF/views/admin/_admin-product-form.jspf

git rm pages/admin/admin.html \
       pages/admin/admin-users.html \
       pages/admin/admin-user-edit.html \
       pages/admin/admin-products.html \
       pages/admin/admin-product-new.html \
       pages/admin/admin-product-edit.html \
       pages/admin/admin-orders.html \
       pages/admin/admin-order-detail.html

git commit -m "feat(admin): connect management JSP views"
```

`admin-statistics.jsp` and `pages/admin/admin-statistics.html` are intentionally untouched because statistics is outside this assignment.

## Commit 3 - tests + demo data

```bash
git add src/test/java/com/james/LMS/admin sql/admin_demo_seed.sql
git commit -m "test(admin): cover workflow rules and add demo data"
```

## Commit 4 - documentation

```bash
git add docs/admin-management.md docs/admin-audit-report.md docs/admin-commit-plan.md docs/admin-pr-body.md
git commit -m "docs(admin): document setup scope and verification"
```

## Verify before push

```bash
./mvnw -DskipTests compile
./mvnw test
git status
git log --oneline -4
```

Windows:

```powershell
.\mvnw.cmd -DskipTests compile
.\mvnw.cmd test
git status
git log --oneline -4
```

## Push + PR

```bash
git push -u origin tan-admin
```

With GitHub CLI:

```bash
gh pr create --base main --head tan-admin \
  --title "feat(admin): implement user product and order management" \
  --body-file docs/admin-pr-body.md
```
