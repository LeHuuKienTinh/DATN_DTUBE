import React, { useState } from 'react';
import './Menu.scss';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaGift, FaBell, FaUser } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthProvider'; 
const Menu = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const { logout, user } = useAuth();
  const handleLogout  = () => {
    logout(); // gọi logout từ AuthProvider
    navigate('/login');
  };


  return (
    <div className='menu-container'>
      <div className='menu-left'>
        <h1 className='logo'>DTube</h1>
        <Link to='/' className='menu-link'>Trang chủ</Link>
        <Link to='/series' className='menu-link'>Series</Link>
        <Link to='/movies' className='menu-link'>Phim</Link>
        <Link to='/new' className='menu-link'>Mới & Phổ biến</Link>
        <Link to='/mylist' className='menu-link'>Danh sách của tôi</Link>
        <Link to='/languages' className='menu-link'>Duyệt theo ngôn ngữ</Link>
      </div>

      <div className='menu-right'>
        <button className='icon-button'><FaSearch /></button>
        <button className='icon-button'><FaGift /></button>
        <button className='icon-button'><FaBell /></button>

        <div className='user-dropdown'>
          <button className='icon-button' onClick={toggleDropdown}>
            <FaUser />
          </button>
          {showDropdown && (
            <div className='dropdown-menu'>
              <p className='dropdown-item'><strong>{user.name}</strong></p>
              <hr />
              <Link to='/account' className='dropdown-item'>Tài khoản</Link>
              <Link to='/profile' className='dropdown-item'>Lịch Sử</Link>
              <Link to='/help' className='dropdown-item'>Trung tâm trợ giúp</Link>
              <hr />
              <button onClick={handleLogout} className='dropdown-item logout-btn'>Đăng xuất khỏi Netflix</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;
