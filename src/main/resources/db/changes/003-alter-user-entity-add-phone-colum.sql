--liquibase formatted sql

--changeset james:003-alter-user-entity-add-phone-colum.sql
--preconditions onFail:MARK_RAN onError:HALT
--precondition-sql-check expectedResult:0 SELECT COUNT(*) FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'users' AND column_name = 'phone'

ALTER TABLE users ADD COLUMN phone VARCHAR(255);

--rollback ALTER TABLE users DROP COLUMN phone;