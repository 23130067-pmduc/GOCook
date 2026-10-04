-- GO Cook - Admin management schema
-- Run after sql/go_cook_base.sql (users/roles/user_roles).
-- This script only adds/updates tables required by the Admin product/order module.
-- Safe to run again: CREATE/ALTER statements are idempotent where possible.

CREATE TABLE IF NOT EXISTS products
(
    id          BIGSERIAL PRIMARY KEY NOT NULL,
    name        varchar(255)          NOT NULL,
    category    varchar(100)          NOT NULL,
    unit_price  numeric(14, 2)        NOT NULL CHECK (unit_price >= 0),
    min_guests  integer               NOT NULL CHECK (min_guests > 0),
    max_guests  integer               NOT NULL CHECK (max_guests >= min_guests),
    dish_items  text,
    description text,
    image_url   varchar(1000),
    status      varchar(30)           NOT NULL DEFAULT 'DRAFT',
    is_active   boolean               NOT NULL DEFAULT true,
    version     bigint                NOT NULL DEFAULT 0,
    created_at  bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at  bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

-- Migration for anyone who ran the previous Admin schema.
ALTER TABLE products ADD COLUMN IF NOT EXISTS status varchar(30);
UPDATE products
SET status = CASE WHEN is_active THEN 'PUBLISHED' ELSE 'HIDDEN' END
WHERE status IS NULL;
ALTER TABLE products ALTER COLUMN status SET DEFAULT 'DRAFT';
ALTER TABLE products ALTER COLUMN status SET NOT NULL;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_products_status'
    ) THEN
        ALTER TABLE products
            ADD CONSTRAINT chk_products_status
            CHECK (status IN ('PUBLISHED', 'DRAFT', 'HIDDEN'));
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_products_status ON products (status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products (category);
CREATE INDEX IF NOT EXISTS idx_products_updated_at ON products (updated_at DESC);

CREATE TABLE IF NOT EXISTS orders
(
    id              BIGSERIAL PRIMARY KEY NOT NULL,
    order_code      varchar(50) UNIQUE    NOT NULL,
    customer_name   varchar(255)          NOT NULL,
    customer_email  varchar(255),
    product_name    varchar(255)          NOT NULL,
    chef_name       varchar(255),
    service_address varchar(1000),
    guest_count     integer               NOT NULL CHECK (guest_count > 0),
    scheduled_at    timestamp             NOT NULL,
    total_amount    numeric(14, 2)        NOT NULL CHECK (total_amount >= 0),
    status          varchar(30)           NOT NULL CHECK (status IN ('PENDING', 'CONFIRMED', 'COOKING', 'COMPLETED', 'CANCELLED')),
    customer_note   text,
    internal_note   text,
    is_active       boolean               NOT NULL DEFAULT true,
    version         bigint                NOT NULL DEFAULT 0,
    created_at      bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    updated_at      bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE INDEX IF NOT EXISTS idx_orders_status ON orders (status);
CREATE INDEX IF NOT EXISTS idx_orders_scheduled_at ON orders (scheduled_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders (customer_email);
