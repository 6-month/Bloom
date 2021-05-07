import { notification } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React ,{ useEffect, useState , params} from 'react';
import { useParams } from 'react-router';
import { ACCESS_TOKEN, POST_LIST_SIZE } from '../../constants';
import PostList from '../../post/PostList';
import { getUserCreatedPosts, getUserProfile } from '../../util/APIUtils';
import {getAvatarColor} from '../../util/Colors';
import { formatDateTime } from '../../util/Helpers';
import "./Profile.css";

function Profile({match}) {
    let params = match.params;

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // loadUserProfile (username) => username 자리에 db에 등록된 username을 입력하면 해당 유저의 profile정보를 표시해줌
        console.log(params)
        loadUserProfile(params.username);
    }, [])

    const loadUserProfile = (username) => {
        setIsLoading(true);

        getUserProfile(username)
            .then(response => {
                setUser(response);
                setIsLoading(false);
                console.log(response)
            })
    } 
    return (
        <div className="profile">
            {
                user ? (
                    <div className="user-profile">
                        <div className="user-details">
                            <div className="user-avatar">
                                <Avatar 
                                    className="user-avatar-circle" 
                                    style={{ backgroundColor: getAvatarColor(user.name)}} 
                                    src={`data:image/jpeg;base64,${user.profileImage}`}
                                >
                                </Avatar>
                            </div>
                            <div className="user-summary">
                                <div className="full-name">{user.name}</div>
                                <div className="username">{user.username}</div>
                                <div className="user-joined">
                                    Joined {formatDateTime(user.joinedAt)}
                                </div>
                                <div className="followers">Followers : {user.totalFollowers}</div>
                                <div className="followings">Followings : {user.totalFollowings}</div>
                            </div>
                        </div>
                        <div className="user-post-list">
                            <PostList username={user.username} type="USER_CREATED_POSTS"/>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default Profile;