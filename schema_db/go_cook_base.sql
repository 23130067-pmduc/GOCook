CREATE TABLE "users"
(
    "id"         BIGSERIAL PRIMARY KEY NOT NULL,
    "username"   varchar(255)          NOT NULL,
    "password"   varchar(255)          NOT NULL,
    "email"      varchar(255) UNIQUE   NOT NULL,
    "avatar_url" varchar(255),
    "is_active"  boolean               NOT NULL DEFAULT true,
    "version"    bigint                NOT NULL DEFAULT 0,
    "created_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint,
    "updated_at" bigint                NOT NULL DEFAULT (EXTRACT(EPOCH FROM NOW()) * 1000)::bigint
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