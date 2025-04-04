
import './Login.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [credentials, setCredentials] = useState({ 
        username: '', 
        password: '' 
      });
      const [error, setError] = useState('');
      const [isLoading, setIsLoading] = useState(false);
      const { login } = useAuth();
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!credentials.username || !credentials.password) {
          setError('Vui lòng điền đầy đủ thông tin');
          return;
        }
    
        setIsLoading(true);
        setError('');
        
        try {
          const result = await login(credentials);
          
          if (result.success) {
            navigate(result.user.type === '1' ? '/admin' : '/');
          } else {
            setError(result.message || 'Đăng nhập thất bại');
          }
        } catch (err) {
          setError('Lỗi hệ thống, vui lòng thử lại');
          console.error('Login error:', err);
        } finally {
          setIsLoading(false);
        }
      };
    
    return (
        <>
            <div className='login'>
                <div class="login-container">
                    <div class="login-box">
                        <h2 class="title">Đăng nhập</h2>
                        <form onSubmit={handleSubmit}>
                            <div class="input-group">
                                <label>Email hoặc số điện thoại di động</label>
                                <input type="text" value={credentials.username}  onChange={(e) => setCredentials({...credentials, username: e.target.value})}  disabled={isLoading} placeholder="Nhập email hoặc số điện thoại" />
                            </div>
                            <div class="input-group">
                                <label>Mật khẩu</label>
                                <input type="password" placeholder="Nhập mật khẩu" 
                                value={credentials.password}
                                 onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                    disabled={isLoading} />
                            </div>
                            <button class="login-btn" type="submit"disabled={isLoading}>Đăng nhập</button>
                            <div class="divider">HOẶC</div>
                            <button class="code-login-btn">Sử dụng mã đăng nhập</button>
                            <a href="facebook.com" class="forgot-password">Bạn quên mật khẩu?</a>
                            <div class="remember-me">
                                <input type="checkbox" id="remember" />
                                <label for="remember">Ghi nhớ tôi</label>
                            </div>
                            <p class="register">Bạn mới sử dụng DTube? |  <NavLink to="/register"><a href="register">Đăng ký ngay.</a></NavLink></p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;   