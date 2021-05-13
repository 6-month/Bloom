import { notification } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React ,{ useEffect, useState , params} from 'react';
import { useParams } from 'react-router';
import { ACCESS_TOKEN, POST_LIST_SIZE } from '../../constants';
import PostList from '../../post/PostList';
import Follow from '../follow/Follow';
import { checkingFollow, getUserCreatedPosts, getUserProfile } from '../../util/APIUtils';
import {getAvatarColor} from '../../util/Colors';
import { formatDateTime } from '../../util/Helpers';
import "./Profile.css";

function Profile(props) {
    // console을 한번 찍을줄 알았는데 4번 찍는다 이유는?
    let params = props.match.params;
    const [user, setUser] = useState(null);
    
    const [isLoading, setIsLoading] = useState(false);
    const [followState, setFollowState] = useState(false); 

    useEffect(() => {
        // loadUserProfile (username) => username 자리에 db에 등록된 username을 입력하면 해당 유저의 profile정보를 표시해줌
        loadUserProfile(params.username);
        
    },[])

    // 왜 새로고침을 했을때 currentUser 정보를 읽어올수 없는걸까??
            // 새로고침시 currentUser 자체는 읽어 오지만 currentUser의 데이터들은 null로 읽고 있다.

    const loadUserProfile = (username) => {
        setIsLoading(true);

        getUserProfile(username)
            .then(response => {
                setUser(response);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error.message)
            })
    } 

    const follow = (username) => {
        setIsLoading(true);

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
                            <div className="follow-container">
                                <Follow user={user} currentUser={props.currentUser} />
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
            {
                /**
                 * 1. 자신의 프로필이면 Edit Profile 버튼을 추가한다.
                 * 2. 자신의 프로필이면 Follow버튼이 보여지면 안된다.
                 * 3. 다른 사람의 프로필이면 Follow를 할 수 있는 버튼을 보이게 만든다.
                 * 4. 만약 follow되어있는 사람이라면 unfollow를 보여줘야한다.
                    
                cf) 검색 기능을 구현해야함 
                */
            }
            {

            }
        </div>
    );
}

export default Profile;