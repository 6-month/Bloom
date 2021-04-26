import React, { useEffect } from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  Link,
  withRouter
} from 'react-router-dom';
import {HomeOutlined} from '@ant-design/icons';
import ProfileDropdownMenu from './ProfileDropdownMenu';
import './AppHeader.css';

const Header = Layout.Header;

function AppHeader({isAuthenticated, currentUser, onLogout}) {  

  return (
    <Header className="app-header">
      <div className="container">
        <div className="app-title" >
          <Link to="/">Bloom</Link>
        </div>
        <Menu
          className="app-menu"
          mode="horizontal"
          style={{ lineHeight: '64px' }} >
            {
              currentUser ? (
                <Menu.Item key="/">
                  <Link to="/">
                    <HomeOutlined />
                  </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                  <ProfileDropdownMenu 
                    currentUser={currentUser} 
                    handleMenuClick={onLogout}/>
              </Menu.Item>
              ) : (
                <Menu.Item key="/login">
                  <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                  <Link to="/signup">Signup</Link>
                </Menu.Item> 
              )
            }
        </Menu>
      </div>
    </Header>
  );
}

export default AppHeader;