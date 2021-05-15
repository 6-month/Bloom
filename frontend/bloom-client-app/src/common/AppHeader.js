import React, { useEffect } from 'react';
import {Link, useLocation } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { HomeOutlined, UserOutlined,EditOutlined } from '@ant-design/icons';
import logo from '../img/Bloom_logo.png';

import './AppHeader.css';

function ProfileDropdownMenu(props) {
  useEffect(() => {
    // console.log(props.currentUser);
  },[])

    const dropdownMenu = (
      <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
        <Menu.Item key="user-info" className="dropdown-item" disabled>
          <div className="user-full-name-info">
            {props.currentUser.name}
          </div>
          <div className="username-info">
            @{props.currentUser.username}
          </div>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="profile" className="dropdown-item">
          <Link to={`/users/${props.currentUser.username}`}>Profile</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout" className="dropdown-item">
          Logout
        </Menu.Item>
      </Menu>
    );
  
    return (
      <Dropdown 
        overlay={dropdownMenu} >
        <a className="ant-dropdown-link">
           <UserOutlined className="nav-icon" onClick={(e) => e.preventDefault()} /> 
        </a>
      </Dropdown>
    );
  }

function AppHeader(props) {
    const location = useLocation();

    const handleMenuClick = ({key}) => {
        if(key === "logout") {
            props.onLogout();
        }
    };

    let menuItems;
    if(props.currentUser !== null) {
        menuItems = [
            <Menu.Item>
              <Link to="/bloom">
                  <HomeOutlined  />
              </Link>
            </Menu.Item>,
            <Menu.Item>
              <Link to='/post/new'>
                <EditOutlined />
              </Link>
            </Menu.Item>,
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu 
                  currentUser={props.currentUser} 
                  handleMenuClick={handleMenuClick}
                />
            </Menu.Item>
        ];
    }
    else {
        menuItems = [
            <Menu.Item key="/login">
              <Link to="/login">Login</Link>
            </Menu.Item>,
            <Menu.Item key="/signup">
              <Link to="/signup">Signup</Link>
            </Menu.Item>
        ]
    }
    return (
      <div className="nav">
        <img
          src={logo}
          className="logo_size"
        />
        <Menu
          className="app-menu"
          mode="horizontal"
          selectedKeys={[location.pathname]}
            >
            {menuItems}
        </Menu>
    </div>
    );
}


export default AppHeader;