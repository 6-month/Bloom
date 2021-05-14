import React, { useEffect, useState } from 'react';
import { checkingFollow, followUser, unfollowUser } from '../../util/APIUtils';
import { UserDeleteOutlined, UserAddOutlined } from '@ant-design/icons';
import {Button, notification} from "antd";

function Follow({user, currentUser, totalFollower, totalFollowing}) {
    const [profileCheck, setProfileCheck] = useState(null);    
    const [followState, setFollowState] = useState(false);

    const [tFollower, setTotalFollower] = useState(totalFollower);
    const [tFollowing, setTotalFolwing] = useState(totalFollowing);

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
                    setFollowState(true);
                }
                else {
                    console.log("not followed")
                    setFollowState(false);
                }
            })
            .catch(error => {
                console.log(error.message)
            })
        }
    }, [])

    const handleFollowcChanged = () => {
        setFollowState(!followState);

        if(followState) {
            unfollowUser(user.username)
                .then(response => {
                    setTotalFollower(response.totalFollower)
                    setTotalFollower(response.totalFollowing)
                    notification.success({
                        message: "Bloom",
                        description: "Successfully unfollowed"
                    })
                    console.log("success")
                })
                .catch(error => {
                    notification.error({
                        message: "Bloom",
                        description: error.message
                    })
                    
                })
        }
        else {
            followUser(user.username)
                .then(response => {
                    setTotalFollower(response.totalFollower)
                    setTotalFollower(response.totalFollowing)
                    notification.success({
                        message: "Bloom",
                        description: "Successfully followed"
                    })
                    console.log("success")
                })
                .catch(error => {
                    notification.error({
                        message: "Bloom",
                        description: error.message
                    })
                })
        }
    }

    return (
        <div>
            {
                followState ? (
                    // follow 되어있음을표시
                    <div className="followed-container">
                        <Button
                            icon={
                                <UserDeleteOutlined className="nav-icon"/>
                            }
                            onClick={handleFollowcChanged}
                        >
                        </Button>
                        <span>totalFollowers : {totalFollower}</span>
                        <span>totalFollwings ; {totalFollowing}</span>
                    </div>
                ) : (
                    // follow를 할것임을 표시
                    <div className="not-followed-container">
                        <Button
                            icon={
                                <UserAddOutlined className="nav-icon"/>
                            }
                            onClick={handleFollowcChanged}
                        >
                        </Button>
                        <span>totalFollowers : {totalFollower}</span>
                        <span>totalFollwings ; {totalFollowing}</span>
                    </div>
                )
            }
        </div>
    );
}

export default Follow;