import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { apiRequest, unwrap } from '../api';
import { SiteLayout } from '../components/SiteLayout';
import { useAuth } from '../components/AuthContext';

const ERROR_MESSAGES = {
  '1000': 'Không tìm thấy tài khoản với email này.',
  '1003': 'Phiên đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.',
  '1004': 'Mật khẩu xác nhận không khớp.',
  '1005': 'Email này đã được đăng ký.',
  '1006': 'Bạn vừa yêu cầu mã khôi phục. Vui lòng đợi rồi thử lại.',
  '1007': 'Mã OTP đã hết hạn. Vui lòng yêu cầu mã mới.',
  '1008': 'Mã OTP không đúng.',
  '1012': 'Email hoặc mật khẩu không đúng.',
  '1013': 'Email chưa được xác nhận.',
  '1014': 'Email này đã được xác nhận.',
  '1015': 'Vui lòng đợi trước khi yêu cầu gửi lại mã.'
};

function messageOf(error, fallback) {
  return ERROR_MESSAGES[error?.code] || error?.message || fallback;
}

function Message({ value }) {
  if (!value?.text) return null;
  return <div className={`auth-message ${value.type || 'error'}`}>{value.text}</div>;
}

function AuthShell({ children, title = 'Tài khoản GO Cook' }) {
  useEffect(() => { document.title = `${title} | GO Cook`; }, [title]);
  return (
    <SiteLayout>
      <main id="main"><div className="container"><div className="auth">
        <aside className="auth-visual"><img src="/assets/family.png" alt="Gia đình quây quần bên bữa cơm" /><div className="copy"><h2>Bếp ấm.<br/>Cơm ngon.<br/>Nhà mình sum vầy.</h2><p>Để GO Cook chăm bữa ăn, bạn dành thời gian cho những người mình thương.</p></div></aside>
        <section className="card auth-form stack">{children}</section>
      </div></div></main>
    </SiteLayout>
  );
}

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: '', password: '' });
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState(null);

  async function submit(e) {
    e.preventDefault(); setBusy(true); setMessage(null);
    try {
      const profile = await login(form.email.trim().toLowerCase(), form.password);
      const roles = profile?.roles || [];
      const target = roles.includes('ROLE_SYSTEM_ADMIN') ? '/admin' : (location.state?.from || '/');
      setMessage({ type: 'success', text: 'Đăng nhập thành công.' });
      setTimeout(() => navigate(target, { replace: true }), 200);
    } catch (error) {
      setMessage({ text: messageOf(error, 'Không thể đăng nhập.') });
      if (error.code === '1013') {
        setTimeout(() => navigate(`/verify-email?email=${encodeURIComponent(form.email)}`), 600);
      }
    } finally { setBusy(false); }
  }

  return <AuthShell title="Đăng nhập">
    <nav className="tabs"><Link aria-current="page" to="/login">Đăng nhập</Link><Link to="/register">Đăng ký</Link></nav>
    <div><h1>Chào bạn trở lại!</h1><p className="muted">Bữa cơm ngon tiếp theo đang chờ bạn.</p></div>
    <Message value={message}/>
    <form className="stack" onSubmit={submit}>
      <label className="field">Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="ban@example.com" autoComplete="username" required /></label>
      <label className="field">Mật khẩu<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="Nhập mật khẩu" autoComplete="current-password" required /></label>
      <div className="between"><span/><Link className="text-link small" to="/forgot-password">Quên mật khẩu?</Link></div>
      <button className="btn full" disabled={busy}>{busy ? 'Đang đăng nhập...' : 'Đăng nhập'}</button>
    </form>
    <p className="small muted">Bạn mới đến? <Link className="text-link" to="/register">Tạo tài khoản</Link></p>
  </AuthShell>;
}

export function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username:'', email:'', password:'', confirm:'' });
  const [terms, setTerms] = useState(false);
  const [busy,setBusy]=useState(false); const [message,setMessage]=useState(null);
  async function submit(e) {
    e.preventDefault(); setMessage(null);
    if (form.password.length < 8) return setMessage({text:'Mật khẩu phải có ít nhất 8 ký tự.'});
    if (form.password !== form.confirm) return setMessage({text:'Mật khẩu nhập lại không khớp.'});
    if (!terms) return setMessage({text:'Bạn cần đồng ý với điều khoản sử dụng.'});
    setBusy(true);
    try {
      const email=form.email.trim().toLowerCase();
      await apiRequest('/api/v1/users/sign-up',{method:'POST',body:JSON.stringify({username:form.username.trim(),email,password:form.password})});
      setMessage({type:'success',text:`Đăng ký thành công. OTP đã được gửi tới ${email}.`});
      setTimeout(()=>navigate(`/verify-email?email=${encodeURIComponent(email)}`),400);
    } catch(error){ setMessage({text:messageOf(error,'Không thể tạo tài khoản.')}); }
    finally{setBusy(false);}
  }
  return <AuthShell title="Đăng ký">
    <nav className="tabs"><Link to="/login">Đăng nhập</Link><Link aria-current="page" to="/register">Đăng ký</Link></nav>
    <div><h1>Tạo tài khoản</h1><p className="muted">Đăng ký để đặt đầu bếp và quản lý bữa ăn.</p></div>
    <Message value={message}/>
    <form className="stack" onSubmit={submit}>
      <label className="field">Họ và tên<input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} required /></label>
      <label className="field">Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
      <label className="field">Mật khẩu<input type="password" minLength="8" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></label>
      <label className="field">Nhập lại mật khẩu<input type="password" value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})} required /></label>
      <label className="check"><input type="checkbox" checked={terms} onChange={e=>setTerms(e.target.checked)}/><span>Tôi đồng ý với điều khoản sử dụng.</span></label>
      <button className="btn full" disabled={busy}>{busy?'Đang tạo tài khoản...':'Tạo tài khoản'}</button>
    </form>
  </AuthShell>;
}

export function VerifyEmailPage() {
  const [params]=useSearchParams(); const navigate=useNavigate();
  const [email,setEmail]=useState(params.get('email')||''); const [otp,setOtp]=useState('');
  const [message,setMessage]=useState(null); const [busy,setBusy]=useState(false);
  async function verify(e){e.preventDefault();setBusy(true);setMessage(null);try{await apiRequest('/api/v1/users/verify-email',{method:'POST',body:JSON.stringify({email:email.trim().toLowerCase(),otp})});setMessage({type:'success',text:'Xác nhận email thành công.'});setTimeout(()=>navigate('/login?verified=1'),400);}catch(error){setMessage({text:messageOf(error,'Không thể xác nhận email.')});}finally{setBusy(false);}}
  async function resend(){setBusy(true);setMessage(null);try{await apiRequest('/api/v1/users/resend-verification',{method:'POST',body:JSON.stringify({email:email.trim().toLowerCase()})});setMessage({type:'success',text:`OTP mới đã được gửi tới ${email}.`});}catch(error){setMessage({text:messageOf(error,'Không thể gửi lại OTP.')});}finally{setBusy(false);}}
  return <AuthShell title="Xác nhận email"><div><span className="badge">Xác nhận email</span><h1>Nhập mã xác nhận</h1><p className="muted">Mã OTP 6 chữ số có hiệu lực trong 10 phút.</p></div><Message value={message}/><form className="stack" onSubmit={verify}><label className="field">Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label className="field">Mã OTP<input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} inputMode="numeric" pattern="[0-9]{6}" maxLength="6" required/></label><button className="btn" disabled={busy}>{busy?'Đang xử lý...':'Xác nhận email'}</button></form><button className="text-link" type="button" onClick={resend} disabled={busy}>Gửi lại mã xác nhận</button><Link className="text-link" to="/login">Về đăng nhập</Link></AuthShell>;
}

export function ForgotPasswordPage(){
  const navigate=useNavigate(); const [email,setEmail]=useState(''); const [message,setMessage]=useState(null); const [busy,setBusy]=useState(false);
  async function submit(e){e.preventDefault();setBusy(true);setMessage(null);try{const clean=email.trim().toLowerCase();await apiRequest('/api/v1/users/forgot-password',{method:'POST',body:JSON.stringify({email:clean})});setMessage({type:'success',text:`OTP đã được gửi tới ${clean}.`});setTimeout(()=>navigate(`/reset-password?email=${encodeURIComponent(clean)}`),400);}catch(error){setMessage({text:messageOf(error,'Không thể gửi mã khôi phục.')});}finally{setBusy(false);}}
  return <AuthShell title="Quên mật khẩu"><div><span className="badge">Khôi phục tài khoản</span><h1>Quên mật khẩu?</h1><p className="muted">Nhập email đã đăng ký để nhận OTP.</p></div><Message value={message}/><form className="stack" onSubmit={submit}><label className="field">Email đã đăng ký<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="ban@example.com" required/></label><button className="btn" disabled={busy}>{busy?'Đang gửi OTP...':'Gửi mã khôi phục'}</button></form><Link className="text-link" to="/login">Về đăng nhập</Link></AuthShell>;
}

export function ResetPasswordPage(){
  const [params]=useSearchParams(); const navigate=useNavigate();
  const [email,setEmail]=useState(params.get('email')||''); const [otp,setOtp]=useState(''); const [token,setToken]=useState(''); const [password,setPassword]=useState(''); const [confirm,setConfirm]=useState(''); const [message,setMessage]=useState(null); const [busy,setBusy]=useState(false);
  async function verify(e){e.preventDefault();setBusy(true);setMessage(null);try{const data=await apiRequest('/api/v1/users/verify-otp',{method:'POST',body:JSON.stringify({email:email.trim().toLowerCase(),otp})});const reset=unwrap(data)?.resetPasswordToken;if(!reset)throw new Error('Không nhận được reset token.');setToken(reset);setMessage({type:'success',text:'OTP hợp lệ. Hãy nhập mật khẩu mới.'});}catch(error){setMessage({text:messageOf(error,'OTP không hợp lệ.')});}finally{setBusy(false);}}
  async function reset(e){e.preventDefault();if(password.length<8)return setMessage({text:'Mật khẩu mới phải có ít nhất 8 ký tự.'});if(password!==confirm)return setMessage({text:'Mật khẩu xác nhận không khớp.'});setBusy(true);setMessage(null);try{await apiRequest('/api/v1/users/reset-password',{method:'POST',body:JSON.stringify({resetPasswordToken:token,newPassword:password,confirmPassword:confirm})});setMessage({type:'success',text:'Đổi mật khẩu thành công.'});setTimeout(()=>navigate('/login?reset=1'),400);}catch(error){setMessage({text:messageOf(error,'Không thể đổi mật khẩu.')});}finally{setBusy(false);}}
  return <AuthShell title="Đặt lại mật khẩu"><div><span className="badge">Bảo mật tài khoản</span><h1>Đặt lại mật khẩu</h1></div><Message value={message}/>{!token?<form className="stack" onSubmit={verify}><label className="field">Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></label><label className="field">Mã OTP<input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))} pattern="[0-9]{6}" maxLength="6" required/></label><button className="btn" disabled={busy}>{busy?'Đang xác minh...':'Xác minh OTP'}</button></form>:<form className="stack" onSubmit={reset}><label className="field">Mật khẩu mới<input type="password" minLength="8" value={password} onChange={e=>setPassword(e.target.value)} required/></label><label className="field">Xác nhận mật khẩu<input type="password" minLength="8" value={confirm} onChange={e=>setConfirm(e.target.value)} required/></label><button className="btn" disabled={busy}>{busy?'Đang lưu...':'Lưu mật khẩu mới'}</button></form>}<Link className="text-link" to="/login">Về đăng nhập</Link></AuthShell>;
}

export function LogoutPage(){
  const { logout }=useAuth(); const navigate=useNavigate(); const [done,setDone]=useState(false);
  useEffect(()=>{let alive=true;(async()=>{await logout();if(alive){setDone(true);setTimeout(()=>navigate('/login',{replace:true}),300);}})();return()=>{alive=false};},[logout,navigate]);
  return <SiteLayout><main id="main"><div className="container section"><section className="card empty"><h1>Đăng xuất</h1><p className="muted">{done?'Đã đăng xuất. Đang chuyển về trang đăng nhập...':'Đang đăng xuất...'}</p></section></div></main></SiteLayout>;
}
