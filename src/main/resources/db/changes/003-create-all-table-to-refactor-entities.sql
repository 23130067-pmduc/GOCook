
--liquibase formatted sql

--changeset james:003-create-all-table-to-refactor-entities.sql
--preconditions onFail:MARK_RAN onError:HALT

CREATE TYPE "chat_message_type" AS ENUM (
  'TEXT',
  'IMAGE',
  'FILE',
  'SYSTEM'
);

CREATE TYPE "chat_conversation_status" AS ENUM (
  'ACTIVE',
  'CLOSED'
);

CREATE TABLE "users"
(
    "id"             BIGSERIAL PRIMARY KEY NOT NULL,
    "username"       varchar(255)          NOT NULL,
    "password"       varchar(255)          NOT NULL,
    "phone"          varchar(15)           NOT NULL,
    "email"          varchar(255) UNIQUE   NOT NULL,
    "avatar_url"     varchar(255),
    "province_code"  VARCHAR(20),
    "ward_code"      VARCHAR(20),
    "address_detail" VARCHAR(500),
    "is_active"      boolean               NOT NULL DEFAULT true,
    "version"        bigint                NOT NULL DEFAULT 0,
    "created_at"     bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"     bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "chef_profiles"
(
    "id"               BIGSERIAL PRIMARY KEY NOT NULL,
    "bio"              TEXT,
    "experience_years" int                   NOT NULL,
    "user_id"          bigint                NOT NULL,
    "is_active"        boolean               NOT NULL DEFAULT true,
    "version"          bigint                NOT NULL DEFAULT 0,
    "created_at"       bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"       bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "roles"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "role_name"  varchar               NOT NULL,
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "user_roles"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "user_id"    bigint                NOT NULL,
    "role_id"    bigint                NOT NULL,
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "categories"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "name"       varchar(255)          NOT NULL,
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "menu_assets"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "url"        varchar(300)          NOT NULL,
    "menu_id"    bigint                NOT NULL,
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "menus"
(
    "id"          BIGSERIAL PRIMARY KEY NOT NULL,
    "name"        varchar(255)          NOT NULL,
    "temp_price"  decimal               NOT NULL,
    "min_guests"  int                   NOT NULL,
    "max_guests"  int                   NOT NULL,
    "description" text,
    "status"      varchar(100),
    "category_id" bigint                NOT NULL,
    "seller_id"   bigint                NOT NULL,
    "is_active"   boolean               NOT NULL DEFAULT true,
    "version"     bigint                NOT NULL DEFAULT 0,
    "created_at"  bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"  bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "menu_dishes"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "menu_id"    bigint                NOT NULL,
    "dish_id"    bigint                NOT NULL,
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "dishes"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "name"       varchar(255)          NOT NULL,
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "chef_reports"
(
    "id"         BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "image_url"  varchar(300) NOT NULL,
    "booking_id" bigint       NOT NULL,
    "is_active"  boolean      NOT NULL DEFAULT true,
    "version"    bigint       NOT NULL DEFAULT 0,
    "created_at" bigint       NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint       NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "booking_item_dishes"
(
    "id"         BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "dish_id"    BIGINT          NOT NULL,
    "dish_name"  VARCHAR(255),
    "quantity"   INT             NOT NULL,
    "unit_price" NUMERIC(12,2) NOT NULL,
    "is_active"  boolean         NOT NULL DEFAULT true,
    "version"    bigint          NOT NULL DEFAULT 0,
    "created_at" bigint          NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint          NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "bookings"
(
    "id"              BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "booking_code"    varchar(50) UNIQUE NOT NULL,
    "customer_id"     bigint             NOT NULL,
    "chef_id"         bigint,
    "scheduled_at"    timestamptz        NOT NULL,
    "service_address" varchar(500)       NOT NULL,
    "customer_note"   jsonb,
    "guest_count"     int                NOT NULL,
    "total_amount"    numeric(12, 2)     NOT NULL,
    "payment_id"      bigint,
    "booking_status"  varchar(30)        NOT NULL DEFAULT 'PENDING',
    "is_active"       boolean            NOT NULL DEFAULT true,
    "version"         bigint             NOT NULL DEFAULT 0,
    "created_at"      bigint             NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"      bigint             NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "booking_requests"
(
    "id"         BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "booking_id" BIGINT        NOT NULL,
    "chef_id"    bigint        NOT NULL,
    "status"     VARCHAR(30) NOT NULL,
    "is_active"  boolean       NOT NULL DEFAULT true,
    "version"    bigint        NOT NULL DEFAULT 0,
    "created_at" bigint        NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint        NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "payments"
(
    "id"                     BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "payment_method"         VARCHAR(30),
    "transaction_code"       VARCHAR(150),
    "amount"                 NUMERIC(12,2),
    "status"                 VARCHAR(30),
    "paid_at"                TIMESTAMPTZ,
    "provider_response_code" VARCHAR(100),
    "is_active"              boolean NOT NULL DEFAULT true,
    "version"                bigint  NOT NULL DEFAULT 0,
    "created_at"             bigint  NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"             bigint  NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "booking_price_offers"
(
    "id"              BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    "total_amount"    numeric(12, 2) NOT NULL,
    "status"          varchar(100),
    "message"         varchar(255),
    "conversation_id" bigint         NOT NULL,
    "sender_user_id"  bigint         NOT NULL,
    "booking_id"      bigint         NOT NULL,
    "is_active"       boolean        NOT NULL DEFAULT true,
    "version"         bigint         NOT NULL DEFAULT 0,
    "created_at"      bigint         NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"      bigint         NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "chat_conversations"
(
    "id"              BIGSERIAL PRIMARY KEY    NOT NULL,
    "customer_id"     bigint                   NOT NULL,
    "chef_id"         bigint                   NOT NULL,
    "booking_id"      bigint,
    "status"          chat_conversation_status NOT NULL DEFAULT 'ACTIVE',
    "last_message_at" bigint,
    "version"         bigint                   NOT NULL DEFAULT 0,
    "created_at"      bigint                   NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"      bigint                   NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "chat_messages"
(
    "id"                  BIGSERIAL PRIMARY KEY NOT NULL,
    "conversation_id"     bigint                NOT NULL,
    "sender_user_id"      bigint                NOT NULL,
    "message_type"        chat_message_type     NOT NULL DEFAULT 'TEXT',
    "content"             text,
    "is_read"             boolean               NOT NULL DEFAULT false,
    "read_at"             bigint,
    "reply_to_message_id" bigint,
    "version"             bigint                NOT NULL DEFAULT 0,
    "created_at"          bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at"          bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE TABLE "chat_message_attachments"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "message_id" bigint                NOT NULL,
    "file_url"   varchar(1000)         NOT NULL,
    "file_name"  varchar(255),
    "file_type"  varchar(100),
    "file_size"  bigint,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
);

CREATE UNIQUE INDEX "uk_booking_requests_chef_booking" ON "booking_requests" ("chef_id", "booking_id");
--
-- ALTER TABLE "chef_profiles"
--     ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "user_roles"
--     ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "user_roles"
--     ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "menu_assets"
--     ADD FOREIGN KEY ("menu_id") REFERENCES "menus" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "menus"
--     ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "menus"
--     ADD FOREIGN KEY ("seller_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "menu_dishes"
--     ADD FOREIGN KEY ("menu_id") REFERENCES "menus" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "menu_dishes"
--     ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chef_reports"
--     ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "booking_item_dishes"
--     ADD FOREIGN KEY ("dish_id") REFERENCES "dishes" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "bookings"
--     ADD FOREIGN KEY ("customer_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "bookings"
--     ADD FOREIGN KEY ("chef_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "bookings"
--     ADD FOREIGN KEY ("payment_id") REFERENCES "payments" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "booking_requests"
--     ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "booking_requests"
--     ADD FOREIGN KEY ("chef_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "booking_price_offers"
--     ADD FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "booking_price_offers"
--     ADD FOREIGN KEY ("sender_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "booking_price_offers"
--     ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_conversations"
--     ADD FOREIGN KEY ("customer_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_conversations"
--     ADD FOREIGN KEY ("chef_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_conversations"
--     ADD FOREIGN KEY ("booking_id") REFERENCES "bookings" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_messages"
--     ADD FOREIGN KEY ("conversation_id") REFERENCES "chat_conversations" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_messages"
--     ADD FOREIGN KEY ("sender_user_id") REFERENCES "users" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_messages"
--     ADD FOREIGN KEY ("reply_to_message_id") REFERENCES "chat_messages" ("id") DEFERRABLE INITIALLY IMMEDIATE;
--
-- ALTER TABLE "chat_message_attachments"
--     ADD FOREIGN KEY ("message_id") REFERENCES "chat_messages" ("id") DEFERRABLE INITIALLY IMMEDIATE;
