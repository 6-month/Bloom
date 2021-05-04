import React, { useEffect } from 'react';
import './AppHeader.css';
import { HomeOutlined, LoginOutlined, LogoutOutlined, ProfileOutlined, EditTwoTone} from '@ant-design/icons';
import { Link } from 'react-router-dom';

function AppHeader({isAuthenticated, currentUser, onLogout}) {  

  return (
    <div className="app-header">
      <div className="home">
        <Link to = "/">
         <HomeOutlined className="nav-icon"/>
        </Link>  
      </div>
      <div className="menu">
        <Link to = "/login">
          <LoginOutlined className="nav-icon" />
        </Link>
        <Link to = "/">
          <LogoutOutlined className="nav-icon"/>
        </Link>
        <Link to = "/post/new">
          <EditTwoTone className="nav-icon"/>
        </Link>
        <Link to = "/users/:username">
          <ProfileOutlined className="nav-icon" />
        </Link>
      </div>
    </div>
  );
}

export default AppHeader;