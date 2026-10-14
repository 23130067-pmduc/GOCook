-- GO Cook / Chef module migration v1 (2026-10-14)
-- PREREQUISITES (already executed by user):
--   schema_db/go_cook_base.sql
--   sql/admin_management.sql
--   sql/admin_demo_seed.sql (optional sample data)
-- Do NOT run sql/domain_model_v2.sql before/after this migration without comparing overlaps.
-- Designed for PostgreSQL 16; do not execute on production without review/backup.
-- Idempotent for the three-file baseline; transactional DDL.
-- IMPORTANT: the Java OrderStatus enum still needs to be updated before NEW statuses are used.

BEGIN;
SET LOCAL lock_timeout = '10s';
SET LOCAL statement_timeout = '2min';

-- Giữ role DB legacy USER/INSTRUCTOR/ADMIN/COMPANY_ADMIN để không phá login.
-- Business only has Customer, Chef, Admin: ROLE_INSTRUCTOR means Chef.

-- 1) Chef profile (extends user, not a new login role).
CREATE TABLE IF NOT EXISTS chef_profiles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE REFERENCES users(id),
    display_name VARCHAR(255) NOT NULL,
    bio TEXT,
    phone VARCHAR(30),
    service_area VARCHAR(500),
    rating NUMERIC(3,2) NOT NULL DEFAULT 0 CHECK (rating BETWEEN 0 AND 5),
    is_verified BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version BIGINT NOT NULL DEFAULT 0,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

-- 2) Existing products: ownership and multiple Cloudinary images.
ALTER TABLE products ADD COLUMN IF NOT EXISTS seller_id BIGINT;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'products'::regclass AND conname = 'fk_products_seller') THEN
        ALTER TABLE products ADD CONSTRAINT fk_products_seller FOREIGN KEY (seller_id) REFERENCES users(id);
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_seller_status ON products(seller_id, status);

CREATE TABLE IF NOT EXISTS product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(2000) NOT NULL,
    cloudinary_public_id VARCHAR(500),
    alt_text VARCHAR(255),
    display_order INT NOT NULL DEFAULT 0 CHECK (display_order >= 0),
    is_cover BOOLEAN NOT NULL DEFAULT false,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version BIGINT NOT NULL DEFAULT 0,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id, display_order, id);
CREATE UNIQUE INDEX IF NOT EXISTS ux_product_images_cover
    ON product_images(product_id) WHERE is_cover = true AND is_active = true;
-- products.image_url remains as legacy preview; backend should sync with cover image.
-- Legacy /assets/... seed pictures remain untouched.

-- 3) Existing orders: customer/chef ownership, menu vs budget, acceptance.
ALTER TABLE orders ADD COLUMN IF NOT EXISTS customer_id BIGINT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chef_id BIGINT;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_type VARCHAR(15) NOT NULL DEFAULT 'MENU';
ALTER TABLE orders ADD COLUMN IF NOT EXISTS service_duration_minutes INTEGER NOT NULL DEFAULT 120;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS chef_completed_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS accepted_at TIMESTAMPTZ;
ALTER TABLE orders ADD COLUMN IF NOT EXISTS rejected_reason TEXT;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'orders'::regclass AND conname = 'fk_orders_customer') THEN
        ALTER TABLE orders ADD CONSTRAINT fk_orders_customer FOREIGN KEY (customer_id) REFERENCES users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'orders'::regclass AND conname = 'fk_orders_chef') THEN
        ALTER TABLE orders ADD CONSTRAINT fk_orders_chef FOREIGN KEY (chef_id) REFERENCES users(id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'orders'::regclass AND conname = 'chk_orders_service_type') THEN
        ALTER TABLE orders ADD CONSTRAINT chk_orders_service_type CHECK (service_type IN ('MENU','BUDGET'));
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid = 'orders'::regclass AND conname = 'chk_orders_duration') THEN
        ALTER TABLE orders ADD CONSTRAINT chk_orders_duration CHECK (service_duration_minutes BETWEEN 30 AND 1440);
    END IF;
END $$;
-- admin_management.sql created orders_status_check with 5 old values.
-- Extend it; backend enum and Admin UI must be updated BEFORE using new values.
ALTER TABLE orders DROP CONSTRAINT IF EXISTS orders_status_check;
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='orders'::regclass AND conname='chk_orders_status_chef') THEN
      ALTER TABLE orders ADD CONSTRAINT chk_orders_status_chef CHECK (
        status IN ('PENDING','CONFIRMED','PREPARING','COOKING',
                   'AWAITING_ACCEPTANCE','COMPLETED','CANCELLED','REJECTED')
      );
    END IF;
END $$;
CREATE INDEX IF NOT EXISTS idx_orders_chef_status ON orders(chef_id,status);
CREATE INDEX IF NOT EXISTS idx_orders_customer ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_chef_schedule ON orders(chef_id,scheduled_at);
CREATE INDEX IF NOT EXISTS idx_orders_acceptance ON orders(chef_id,accepted_at) WHERE accepted_at IS NOT NULL;

-- New booking items: preserve price/name even when Chef changes a menu.
CREATE TABLE IF NOT EXISTS order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE SET NULL,
    product_name_snapshot VARCHAR(255) NOT NULL,
    unit_price_snapshot NUMERIC(14,2) NOT NULL CHECK (unit_price_snapshot >= 0),
    guest_count INT NOT NULL CHECK (guest_count > 0),
    quantity INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
    line_total NUMERIC(14,2) NOT NULL CHECK (line_total >= 0),
    note TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version BIGINT NOT NULL DEFAULT 0,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);
CREATE INDEX IF NOT EXISTS idx_order_items_order ON order_items(order_id);

-- Audit changes to Chef order status (filled by backend when changes happen).
CREATE TABLE IF NOT EXISTS order_status_history (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    actor_user_id BIGINT REFERENCES users(id),
    previous_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    note TEXT,
    changed_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order ON order_status_history(order_id, changed_at DESC);

-- 4) Chef buys ingredients OFFLINE at a supermarket; uploads MULTIPLE receipts.
-- Neither inventory nor supermarket accounts are modeled here.
CREATE TABLE IF NOT EXISTS order_ingredient_receipts (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    chef_id BIGINT NOT NULL REFERENCES users(id),
    file_url VARCHAR(2000) NOT NULL,
    cloudinary_public_id VARCHAR(500),
    original_filename VARCHAR(255),
    mime_type VARCHAR(100),
    note TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version BIGINT NOT NULL DEFAULT 0,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);
CREATE INDEX IF NOT EXISTS idx_ingredient_receipts_order ON order_ingredient_receipts(order_id,created_at DESC);
-- No receipt cost is deducted from Chef's 85%. File validation/ownership is mandatory in backend.

-- 5) Chef schedules & protected reservations.
CREATE EXTENSION IF NOT EXISTS btree_gist;
CREATE TABLE IF NOT EXISTS seller_schedules (
    id BIGSERIAL PRIMARY KEY,
    seller_id BIGINT NOT NULL REFERENCES users(id),
    service_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    available BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version BIGINT NOT NULL DEFAULT 0,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    CONSTRAINT chk_seller_schedules_time CHECK (start_time < end_time),
    CONSTRAINT uq_seller_schedule_slot UNIQUE (seller_id, service_date, start_time, end_time)
);
CREATE INDEX IF NOT EXISTS idx_seller_schedule_date ON seller_schedules(seller_id,service_date);
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='seller_schedules'::regclass AND conname='ex_seller_schedule_no_overlap') THEN
        ALTER TABLE seller_schedules ADD CONSTRAINT ex_seller_schedule_no_overlap
        EXCLUDE USING gist (
            seller_id WITH =,
            (tsrange(service_date + start_time, service_date + end_time, '[)')) WITH &&
        ) WHERE (is_active);
    END IF;
END $$;

-- Reservation is linked to an order, independent from Chef's editable availability slots.
CREATE TABLE IF NOT EXISTS chef_bookings (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id) ON DELETE CASCADE,
    chef_id BIGINT NOT NULL REFERENCES users(id),
    starts_at TIMESTAMP NOT NULL,
    ends_at TIMESTAMP NOT NULL,
    booking_status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_chef_bookings_time CHECK (ends_at > starts_at),
    CONSTRAINT chk_chef_bookings_status CHECK (booking_status IN ('ACTIVE','RELEASED'))
);
CREATE INDEX IF NOT EXISTS idx_chef_bookings_chef ON chef_bookings(chef_id,starts_at);
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conrelid='chef_bookings'::regclass AND conname='ex_chef_bookings_no_overlap') THEN
        ALTER TABLE chef_bookings ADD CONSTRAINT ex_chef_bookings_no_overlap
        EXCLUDE USING gist (chef_id WITH =, (tsrange(starts_at,ends_at,'[)')) WITH &&)
        WHERE (booking_status = 'ACTIVE');
    END IF;
END $$;

-- 6) Payment attempts: Chef code may READ verified payment status but payment group
-- owns gateway callbacks. One order can have multiple attempts.
CREATE TABLE IF NOT EXISTS payment_transactions (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    provider VARCHAR(50) NOT NULL,
    transaction_code VARCHAR(255),
    amount NUMERIC(14,2) NOT NULL CHECK (amount >= 0),
    status VARCHAR(30) NOT NULL CHECK (status IN ('PENDING','SUCCESS','FAILED','CANCELLED','REFUNDED')),
    paid_at TIMESTAMPTZ,
    raw_reference TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    version BIGINT NOT NULL DEFAULT 0,
    created_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at BIGINT NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);
CREATE INDEX IF NOT EXISTS idx_payment_transaction_order ON payment_transactions(order_id,status);
CREATE UNIQUE INDEX IF NOT EXISTS ux_payment_provider_code ON payment_transactions(provider,transaction_code)
  WHERE transaction_code IS NOT NULL;

-- 7) Simulated escrow; NOT a real bank transfer / licensed escrow.
-- Locked 100% at successful checkout, released only after customer acceptance.
-- Platform fee 15%, Chef gross share 85% INCLUDING all ingredient expense.
CREATE TABLE IF NOT EXISTS order_escrows (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL UNIQUE REFERENCES orders(id),
    chef_id BIGINT NOT NULL REFERENCES users(id),
    payment_transaction_id BIGINT NOT NULL REFERENCES payment_transactions(id),
    gross_amount NUMERIC(14,2) NOT NULL CHECK (gross_amount >= 0),
    platform_fee NUMERIC(14,2) NOT NULL CHECK (platform_fee >= 0),
    chef_amount NUMERIC(14,2) NOT NULL CHECK (chef_amount >= 0),
    status VARCHAR(30) NOT NULL DEFAULT 'HELD',
    held_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    released_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT chk_escrow_split CHECK (gross_amount = platform_fee + chef_amount),
    CONSTRAINT chk_escrow_status CHECK (status IN ('HELD','RELEASED','REFUND_PENDING','REFUNDED')),
    CONSTRAINT chk_escrow_release_time CHECK ((status = 'RELEASED') = (released_at IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS idx_order_escrows_chef_status ON order_escrows(chef_id,status);
CREATE INDEX IF NOT EXISTS idx_order_escrows_released ON order_escrows(chef_id,released_at)
  WHERE status = 'RELEASED';

CREATE TABLE IF NOT EXISTS escrow_ledger_entries (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT NOT NULL REFERENCES orders(id),
    escrow_id BIGINT NOT NULL REFERENCES order_escrows(id),
    entry_type VARCHAR(30) NOT NULL CHECK (entry_type IN ('HELD','RELEASED','REFUND_PENDING','REFUNDED')),
    gross_amount NUMERIC(14,2) NOT NULL,
    chef_amount NUMERIC(14,2) NOT NULL,
    platform_fee NUMERIC(14,2) NOT NULL,
    note TEXT,
    event_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT uq_escrow_ledger_order_event UNIQUE(order_id,entry_type)
);
CREATE INDEX IF NOT EXISTS idx_escrow_ledger_escrow ON escrow_ledger_entries(escrow_id,event_at);

-- Called ONLY after backend validated gateway callback and stored SUCCESS payment.
-- Locks order and payment transaction; callback retries do not create duplicate escrow.
CREATE OR REPLACE FUNCTION gocook_register_verified_payment(
    p_order_id BIGINT, p_payment_transaction_id BIGINT
) RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_order orders%ROWTYPE;
    v_payment payment_transactions%ROWTYPE;
    v_escrow_id BIGINT;
    v_fee NUMERIC(14,2);
BEGIN
    SELECT * INTO v_order FROM orders WHERE id=p_order_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Order % not found',p_order_id; END IF;
    SELECT * INTO v_payment FROM payment_transactions WHERE id=p_payment_transaction_id FOR UPDATE;
    IF NOT FOUND OR v_payment.order_id <> p_order_id
        OR v_payment.status <> 'SUCCESS' OR v_payment.paid_at IS NULL THEN
        RAISE EXCEPTION 'Missing verified successful payment for order %',p_order_id;
    END IF;
    IF v_order.chef_id IS NULL OR v_order.customer_id IS NULL THEN
        RAISE EXCEPTION 'Assign chef_id and customer_id before payment escrow for order %',p_order_id;
    END IF;
    IF v_order.status <> 'PENDING' THEN
        RAISE EXCEPTION 'New paid order must be PENDING (actual: %)',v_order.status;
    END IF;
    IF v_payment.amount <> v_order.total_amount THEN
        RAISE EXCEPTION 'Payment mismatch for order %',p_order_id;
    END IF;
    IF EXISTS (SELECT 1 FROM order_escrows WHERE order_id=p_order_id) THEN
        RETURN FALSE;
    END IF;
    v_fee := ROUND(v_order.total_amount * 0.15,2);
    INSERT INTO order_escrows(order_id,chef_id,payment_transaction_id,gross_amount,platform_fee,chef_amount)
        VALUES (p_order_id,v_order.chef_id,p_payment_transaction_id,
                v_order.total_amount,v_fee,v_order.total_amount-v_fee)
        RETURNING id INTO v_escrow_id;
    INSERT INTO escrow_ledger_entries(order_id,escrow_id,entry_type,gross_amount,chef_amount,platform_fee,note)
        VALUES (p_order_id,v_escrow_id,'HELD',v_order.total_amount,
                v_order.total_amount-v_fee,v_fee,'Verified payment; 100% held');
    RETURN TRUE;
END $$;

-- Customer-only acceptance. Backend obtains p_customer_id from auth token (NOT client payload).
-- Updates order + escrow + ledger atomically; retry returns FALSE (no second release).
CREATE OR REPLACE FUNCTION gocook_accept_and_release(
    p_order_id BIGINT, p_customer_id BIGINT
) RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_order orders%ROWTYPE;
    v_escrow order_escrows%ROWTYPE;
BEGIN
    SELECT * INTO v_order FROM orders WHERE id=p_order_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Order % not found',p_order_id; END IF;
    IF v_order.customer_id IS DISTINCT FROM p_customer_id THEN
        RAISE EXCEPTION 'Customer is not order owner';
    END IF;
    IF v_order.status = 'COMPLETED' AND v_order.accepted_at IS NOT NULL THEN
        RETURN FALSE;
    END IF;
    IF v_order.status <> 'AWAITING_ACCEPTANCE' THEN
        RAISE EXCEPTION 'Order must await acceptance, actual: %', v_order.status;
    END IF;
    SELECT * INTO v_escrow FROM order_escrows WHERE order_id=p_order_id FOR UPDATE;
    IF NOT FOUND OR v_escrow.status <> 'HELD' THEN
        RAISE EXCEPTION 'No HELD escrow for order %',p_order_id;
    END IF;
    UPDATE orders SET status='COMPLETED',accepted_at=CURRENT_TIMESTAMP,
           updated_at=(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
           version=version+1
     WHERE id=p_order_id;
    UPDATE order_escrows SET status='RELEASED',released_at=CURRENT_TIMESTAMP,
                             updated_at=CURRENT_TIMESTAMP WHERE id=v_escrow.id;
    INSERT INTO escrow_ledger_entries(order_id,escrow_id,entry_type,gross_amount,chef_amount,platform_fee,note)
        VALUES (p_order_id,v_escrow.id,'RELEASED',v_escrow.gross_amount,
                v_escrow.chef_amount,v_escrow.platform_fee,'Acceptance: simulated payout, no real bank transfer');
    INSERT INTO order_status_history(order_id,actor_user_id,previous_status,new_status,note)
        VALUES (p_order_id,p_customer_id,'AWAITING_ACCEPTANCE','COMPLETED','Customer accepted; simulated release');
    RETURN TRUE;
END $$;

-- Rejecting an already-paid order must NOT release money to Chef.
-- Mark REFUND_PENDING and hand refund execution to payment team; no automated refund here.
CREATE OR REPLACE FUNCTION gocook_chef_reject_order(
    p_order_id BIGINT, p_chef_id BIGINT, p_reason TEXT
) RETURNS BOOLEAN LANGUAGE plpgsql AS $$
DECLARE
    v_order orders%ROWTYPE;
    v_escrow order_escrows%ROWTYPE;
BEGIN
    SELECT * INTO v_order FROM orders WHERE id=p_order_id FOR UPDATE;
    IF NOT FOUND THEN RAISE EXCEPTION 'Order not found'; END IF;
    IF v_order.chef_id IS DISTINCT FROM p_chef_id THEN
        RAISE EXCEPTION 'Chef is not order owner';
    END IF;
    IF v_order.status = 'REJECTED' THEN RETURN FALSE; END IF;
    IF v_order.status <> 'PENDING' THEN
        RAISE EXCEPTION 'Only PENDING orders can be rejected by Chef';
    END IF;
    SELECT * INTO v_escrow FROM order_escrows WHERE order_id=p_order_id FOR UPDATE;
    IF NOT FOUND OR v_escrow.status <> 'HELD' THEN
        RAISE EXCEPTION 'Expected HELD escrow';
    END IF;
    UPDATE orders SET status='REJECTED', rejected_reason=LEFT(COALESCE(p_reason,''),1000),
       updated_at=(EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,version=version+1
     WHERE id=p_order_id;
    UPDATE order_escrows SET status='REFUND_PENDING',updated_at=CURRENT_TIMESTAMP
     WHERE id=v_escrow.id;
    UPDATE chef_bookings SET booking_status='RELEASED',updated_at=CURRENT_TIMESTAMP
     WHERE order_id=p_order_id;
    INSERT INTO escrow_ledger_entries(order_id,escrow_id,entry_type,gross_amount,chef_amount,platform_fee,note)
        VALUES (p_order_id,v_escrow.id,'REFUND_PENDING',v_escrow.gross_amount,
                v_escrow.chef_amount,v_escrow.platform_fee,'Chef rejected; payment team must refund');
    INSERT INTO order_status_history(order_id,actor_user_id,previous_status,new_status,note)
        VALUES (p_order_id,p_chef_id,'PENDING','REJECTED',p_reason);
    RETURN TRUE;
END $$;

-- 8) Views; order-escrow is the source of truth for paid/held/earned amounts.
CREATE OR REPLACE VIEW v_chef_financial_summary AS
SELECT chef_id,
       COALESCE(SUM(gross_amount),0)::NUMERIC(16,2) AS paid_order_value,
       COALESCE(SUM(gross_amount) FILTER (WHERE status='HELD'),0)::NUMERIC(16,2) AS held_amount,
       COALESCE(SUM(chef_amount) FILTER (WHERE status='RELEASED'),0)::NUMERIC(16,2) AS chef_earned_amount
  FROM order_escrows
 WHERE status IN ('HELD','RELEASED')
 GROUP BY chef_id;

CREATE OR REPLACE VIEW v_chef_monthly_revenue AS
SELECT chef_id,
       date_trunc('month',released_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::date AS month_start,
       COUNT(*) AS accepted_order_count,
       SUM(chef_amount)::NUMERIC(16,2) AS chef_earned_amount
  FROM order_escrows
 WHERE status='RELEASED' AND released_at IS NOT NULL
 GROUP BY chef_id, date_trunc('month',released_at AT TIME ZONE 'Asia/Ho_Chi_Minh')::date;

CREATE OR REPLACE VIEW v_chef_service_mix AS
SELECT e.chef_id,o.service_type,COUNT(*) AS paid_orders
  FROM order_escrows e JOIN orders o ON o.id=e.order_id
 WHERE e.status IN ('HELD','RELEASED')
 GROUP BY e.chef_id,o.service_type;

COMMIT;
