import React, { useEffect, useState } from 'react';
import {Link, useLocation, withRouter} from 'react-router-dom';
import { Menu, Dropdown, PageHeader} from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import postIcon from '../post.svg';
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
            <Menu.Item key ="/">
                <Link to="/">
                    <HomeOutlined className="nav-icon" />
                </Link>
            </Menu.Item>,
            <Menu.Item key ="/post/new">
                <Link to="/post/new">
                    <img src={postIcon} alt="" className="nav-icon"/>
                </Link>
            </Menu.Item>,
            <Menu.Item key="/profile" className="profile-menu">
                <ProfileDropdownMenu 
                currentUser={props.currentUser} 
                handleMenuClick={handleMenuClick}/>
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
        <PageHeader className="app-header">
          <div className="container">
            <div className="app-title">
                <Link to="/">Bloom</Link>
            </div>
            <div className="app-body">
              <Menu
                className="app-menu"
                mode="horizontal"
                selectedKeys={[location.pathname]}
                  >
                  {menuItems}
              </Menu>
            </div>
          </div>
        </PageHeader>
    );
}


export default AppHeader;