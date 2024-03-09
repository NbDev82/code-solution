import React from 'react';
import "./NavbarProblem.scss"

function NavProblem() {
  return (
      <div className="navbar">
        <div className="navbar__container">
          <div className="navbar__logo">
            <img src="logo.png" alt="Logo" />
          </div>
          <ul className="navbar__menu">
            <li className="navbar__menu-item"><a href="#">Trang chủ</a></li>
            <li className="navbar__menu-item"><a href="#">Giới thiệu</a></li>
            <li className="navbar__menu-item"><a href="#">Sản phẩm</a></li>
            <li className="navbar__menu-item"><a href="#">Liên hệ</a></li>
          </ul>
          <div className="navbar__search">
            <input type="text" placeholder="Tìm kiếm" />
          </div>
          <div className="navbar__user">
            <img src="user.png" alt="User" />
          </div>
        </div>
      </div>
  )
}

export default NavProblem