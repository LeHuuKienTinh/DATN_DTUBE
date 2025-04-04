import React, { useState } from "react";
import "./Register.scss"; // Import SCSS file
import { NavLink } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    mail: '',
    password: ''
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    const response = await register(formData);
    
    if (response.success) {
      
      navigate('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
    } else {
      setError(response.message);
    }
  };
  return (
    <div className="register">
      <div className="register-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="title">Đăng ký</h2>
  
          <div className="input-group">
            <label>Email</label>
            <input
              name="mail"
              type="email"
              placeholder="Nhập email của bạn..."
              value={formData.mail} 
              onChange={handleChange} 
              required 
            />
          </div>
  
          <div className="input-group">
            <label>Tên người dùng</label>
            <input
              name="username"
              type="text"
              placeholder="Nhập tên người dùng..."
              value={formData.username} 
              onChange={handleChange} 
              required 
            />
          </div>
  
          <div className="input-group">
            <label>Họ Và Tên:</label>
            <input
              name="name" 
              type="password"
              placeholder="Nhập mật khẩu..."
              value={formData.name} 
              onChange={handleChange} 
              required 
            />
          </div>
  
          <div className="input-group">
            <label>mật khẩu</label>
            <input
              name="password" 
              type="password"
              placeholder="mật khẩu"
              value={formData.password} 
              onChange={handleChange} 
            />
          </div>
  
          {error && <p className="error-text">{error}</p>}
  
          <button className="submit-button" type="submit">Đăng ký</button>
          <p className="login-text">
            Đã có tài khoản? <NavLink to="/login">Đăng nhập ngay!</NavLink>
          </p>
        </form>
      </div>
    </div>
  );
  
};

export default Register;
