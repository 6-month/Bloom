import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { Link, useLocation } from 'react-router-dom';
import { HomeOutlined,UsergroupDeleteOutlined,FormOutlined   } from '@ant-design/icons';
import "./Header.css";
import { Button } from 'antd';

function Header(props) {
    const location = useLocation();

    const handleMenuClick = ({key}) => {
        if(key === "logout") {
            props.onLogout();
        }
    };

    let menuItems;
    if(props.currentUser !== null) {
        menuItems = [
            <div className="menu">
                <div className="menu-content">
                    <div class="menu-content-home">
                        <Link to="/">
                            <HomeOutlined className="nav-icon" />
                        </Link>
                    </div>
                    <div class="menu-content-other">
                        <Link >
                            <UsergroupDeleteOutlined className="nav-icon" />
                        </Link>
                    </div>
                    <div class="menu-content-newpost">
                        <Link to="/post/new">
                            <FormOutlined  className="nav-icon" />
                        </Link>
                    </div>
                    <div class="menu-content-profile">
                        {/* <Avatar 
                            className="user-avatar-circle"  
                            src={`data:image/jpeg;base64,${props.currentUser.profileImage}`}
                        >

                        </Avatar> */}
                        <Button
                            className="profile-btn"
                            shape="circle"
                        >
                           <img 
                                src={`data:image/jpeg;base64,${props.currentUser.profileImage}`}
                                className="profile-btn-img"
                            />
                        </Button>
                    </div>
                </div>
            </div>
        ]
    }
    return (
        <div>
            {menuItems}
        </div>
    );
}

export default Header;