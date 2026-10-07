-- Run ONCE on an existing GO Cook database.
-- Existing accounts are marked verified so old admin/user accounts are not locked out.
ALTER TABLE users
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT FALSE;

UPDATE users
SET email_verified = TRUE
WHERE email_verified IS NULL OR email_verified = FALSE;

ALTER TABLE users
    ALTER COLUMN email_verified SET DEFAULT FALSE;

ALTER TABLE users
    ALTER COLUMN email_verified SET NOT NULL;
