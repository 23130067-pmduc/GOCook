-- GO Cook: customer order history (PostgreSQL)
-- Run AFTER sql/admin_management.sql, with database backup first.
-- Safe when sql/chef_migration_20261014.sql already added customer_id.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id BIGINT;
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'orders'::regclass AND conname = 'fk_orders_customer'
  ) THEN
    ALTER TABLE orders ADD CONSTRAINT fk_orders_customer
      FOREIGN KEY (customer_id) REFERENCES users(id);
  END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);

-- Existing demo orders may have only customer_email, but no customer_id.
-- Review rows first. Do NOT assign them automatically without confirming ownership:
-- SELECT id, order_code, customer_email, customer_id FROM orders ORDER BY id DESC;
