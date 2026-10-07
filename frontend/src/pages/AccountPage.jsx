import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiRequest } from '../api';
import { SiteLayout } from '../components/SiteLayout';
import { useAuth } from '../components/AuthContext';

function initials(name=''){return name.trim().split(/\s+/).slice(-2).map(x=>x[0]?.toUpperCase()).join('')||'--';}

export default function AccountPage(){
  const { profile, refreshProfile }=useAuth();
  const [username,setUsername]=useState(profile?.username||''); const [message,setMessage]=useState(null); const [busy,setBusy]=useState(false);
  async function save(e){e.preventDefault();setBusy(true);setMessage(null);try{await apiRequest('/api/v1/users/profile',{method:'PUT',body:JSON.stringify({username})});await refreshProfile();setMessage({type:'success',text:'Đã cập nhật tên hiển thị.'});}catch(error){setMessage({text:error.message||'Không thể cập nhật hồ sơ.'});}finally{setBusy(false);}}
  return <SiteLayout><main id="main"><div className="container"><div className="page-heading"><nav className="breadcrumb"><Link to="/">Trang chủ</Link><span>/</span><span>Tài khoản của bạn</span></nav><h1>Tài khoản của bạn</h1><p className="lead">Quản lý thông tin tài khoản GO Cook.</p></div><div className="workspace"><nav className="card side-nav"><p className="eyebrow">Góc của bạn</p><Link aria-current="page" to="/account">Tài khoản</Link><Link to="/orders">Đơn đặt nấu</Link><Link to="/chat">Tin nhắn</Link><Link to="/forgot-password">Đổi mật khẩu</Link><Link to="/logout">Đăng xuất</Link></nav><form className="stack" onSubmit={save}><section className="card stack"><div className="row"><span className="avatar large">{initials(profile?.username)}</span><div><h3>{profile?.username}</h3><p className="small muted">{profile?.email}</p></div></div>{message&&<div className={`auth-message ${message.type||'error'}`}>{message.text}</div>}<div className="grid grid-2"><label className="field">Họ và tên<input value={username} onChange={e=>setUsername(e.target.value)} required/></label><label className="field">Email<input value={profile?.email||''} readOnly/></label></div></section><button className="btn" disabled={busy}>{busy?'Đang lưu...':'Lưu thay đổi'}</button></form></div></div></main></SiteLayout>;
}
