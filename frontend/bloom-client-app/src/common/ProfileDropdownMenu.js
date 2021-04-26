import { Menu } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import {Dropdown} from 'antd';
import Icon from '@ant-design/icons';
import './ProfileDropdownMenu.css';

function ProfileDropdownMenu({currentUser, handleMenuCheck}) {
    const dropdownMenu =(
        <Menu onClick={handleMenuCheck} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {currentUser.name}
                </div>
                <div className="username-info">
                    @{currentUser.username}
                </div>
            </Menu.Item>    
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${currentUser.username}`}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item" >
                Logout
            </Menu.Item>
        </Menu>
    );
    
    return (
        <Dropdown 
            overlay={dropdownMenu} 
            trigger={['click']}
            getPopupContainer = { () => document.getElementsByClassName('profile-menu')[0]}
        >
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}} /> <Icon type="down" />
            </a>
        </Dropdown>
    );
}

export default ProfileDropdownMenu;