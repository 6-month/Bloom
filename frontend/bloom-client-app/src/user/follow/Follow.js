import React, { useEffect, useState } from 'react';
import { checkingFollow, followUser, unfollowUser } from '../../util/APIUtils';
import { UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import {Button, notification} from "antd";

function Follow({user, currentUser}) {
    const [profileCheck, setProfileCheck] = useState(null);
    const [followCheck, setFollowCheck] = useState(false);
    
    useEffect(() => {
        if(user.username === currentUser.username) {
            setProfileCheck(true)
        }
        else {
            setProfileCheck(false)

            checkingFollow(user.username)
                .then(response => {
                    if(response.result) {
                        console.log("followed")
                        setFollowCheck(true);
                    }
                    else {
                        console.log("not followed")
                        setFollowCheck(false);
                    }
                })
                .catch(error => {
                    console.log(error.message)
                })
        }
    }, [])

    const handleFollow = () => {
        followUser(user.username)
            .then(response => {
                notification.success({
                    message: "Bloom",
                    description: response.message
                })
            })
            .catch(error => {
                notification.error({
                    message: "Bloom",
                    description: error.message
                })
            })
    }

    const handleUnFollow = () => {
        unfollowUser(user.username)
            .then(response => {
                notification.success({
                    message: "Bloom",
                    description: response.message
                })
            })
            .catch(error => {
                notification.error({
                    message: "Bloom",
                    description: error.message
                })
            })
    }

    return (
        <div>
            {
                followCheck ? (
                    // follow 되어있음을표시
                    <div className="followed-container">
                        <Button
                            icon={
                                <UserDeleteOutlined className="nav-icon"/>
                            }
                            onSubmit={handleFollow}
                        >
                        </Button>
                    </div>
                ) : (
                    // follow를 할것임을 표시
                    <div className="not-followed-container">
                        <Button
                            icon={
                                <UserAddOutlined className="nav-icon"/>
                            }
                            onSubmit={handleUnFollow}
                        >
                        </Button>
                    </div>
                )
            }
        </div>
    );
}

export default Follow;