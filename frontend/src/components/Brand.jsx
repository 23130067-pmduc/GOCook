import React from 'react';
import { Link } from 'react-router-dom';

export function Brand({ admin = false }) {
  return (
    <Link className="brand" to="/" aria-label="GO Cook — Trang chủ">
      <span className="brand-mark">
        <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 14a4 4 0 0 1-2-7 4 4 0 0 1 7-2 4 4 0 0 1 7 2 4 4 0 0 1-2 7v6H7z" />
          <path d="M7 16h10M10 11v2m4-2v2" />
        </svg>
      </span>
      <span>
        <span className="brand-name">GO Cook</span>
        <small>{admin ? 'QUẢN TRỊ HỆ THỐNG' : 'ĐẦU BẾP TẠI GIA'}</small>
      </span>
    </Link>
  );
}
