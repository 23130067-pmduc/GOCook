-- Give ADMIN role to one existing account for local testing.
-- IMPORTANT: replace admin@example.com with the email you use to sign in.

INSERT INTO user_roles (user_id, role_id)
SELECT u.id, r.id
FROM users u
JOIN roles r ON r.role_name = 'ADMIN'
WHERE u.email = 'admin@example.com'
  AND NOT EXISTS (
    SELECT 1
    FROM user_roles ur
    WHERE ur.user_id = u.id
      AND ur.role_id = r.id
      AND ur.is_active = true
  );
