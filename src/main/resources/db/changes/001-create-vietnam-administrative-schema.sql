--liquibase formatted sql

--changeset james:001-create-vietnam-administrative-schema
CREATE TABLE administrative_regions (
    id integer NOT NULL,
    name varchar(255) NOT NULL,
    name_en varchar(255) NOT NULL,
    code_name varchar(255) NULL,
    code_name_en varchar(255) NULL,
    CONSTRAINT administrative_regions_pkey PRIMARY KEY (id)
);

CREATE TABLE administrative_units (
    id integer NOT NULL,
    full_name varchar(255) NULL,
    full_name_en varchar(255) NULL,
    short_name varchar(255) NULL,
    short_name_en varchar(255) NULL,
    code_name varchar(255) NULL,
    code_name_en varchar(255) NULL,
    CONSTRAINT administrative_units_pkey PRIMARY KEY (id)
);

CREATE TABLE provinces (
    code varchar(20) NOT NULL,
    name varchar(255) NOT NULL,
    name_en varchar(255) NULL,
    full_name varchar(255) NOT NULL,
    full_name_en varchar(255) NULL,
    code_name varchar(255) NULL,
    postal_code_prefix varchar(255) NULL,
    administrative_unit_id integer NULL,
    CONSTRAINT provinces_pkey PRIMARY KEY (code),
    CONSTRAINT provinces_administrative_unit_id_fkey
        FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id)
);

CREATE INDEX idx_provinces_unit ON provinces(administrative_unit_id);

CREATE TABLE wards (
    code varchar(20) NOT NULL,
    name varchar(255) NOT NULL,
    name_en varchar(255) NULL,
    full_name varchar(255) NULL,
    full_name_en varchar(255) NULL,
    code_name varchar(255) NULL,
    postal_code varchar(20) NULL,
    province_code varchar(20) NULL,
    administrative_unit_id integer NULL,
    CONSTRAINT wards_pkey PRIMARY KEY (code),
    CONSTRAINT wards_administrative_unit_id_fkey
        FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id),
    CONSTRAINT wards_province_code_fkey
        FOREIGN KEY (province_code) REFERENCES provinces(code)
);

CREATE INDEX idx_wards_province ON wards(province_code);
CREATE INDEX idx_wards_unit ON wards(administrative_unit_id);

-- This table intentionally has no primary key, matching the supplied schema.
CREATE TABLE vn_provinces_metadata (
    dataset_version varchar(50) NOT NULL,
    latest_decree varchar(100) NULL,
    generated_at timestamp NOT NULL
);

--rollback DROP TABLE vn_provinces_metadata;
--rollback DROP TABLE wards;
--rollback DROP TABLE provinces;
--rollback DROP TABLE administrative_units;
--rollback DROP TABLE administrative_regions;
