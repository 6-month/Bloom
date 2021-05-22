import Avatar from 'antd/lib/avatar/avatar';
import React ,{useEffect, useState } from 'react';
import PostList from '../../post/PostList';
import Follow from '../follow/Follow';
import {  getCurrentUser, getUserProfile } from '../../util/APIUtils';
import {getAvatarColor} from '../../util/Colors';
import { formatDateTime } from '../../util/Helpers';
import "./Profile.css";
import { Button } from 'antd';
import {useHistory} from "react-router-dom"
import first from '../../img/Bloom1.png';
import second from '../../img/Bloom2.png';
import thrid from '../../img/Bloom3.png';
import fourth from '../../img/Bloom4.png';

function Profile(props) {
    // console을 한번 찍을줄 알았는데 4번 찍는다 이유는?
    const history = useHistory();

    let params = props.match.params;
    const [profileCheck, setProfileCheck] = useState(null);  
    const [user, setUser] = useState(null);
    const [bloom, setBloom] = useState("first");

    const [isLoading, setIsLoading] = useState(false);
    

    useEffect(() => {
        // loadUserProfile (username) => username 자리에 db에 등록된 username을 입력하면 해당 유저의 profile정보를 표시해줌
        loadUserProfile(params.username);
        // console.log(props.currentUser)
        
        // props.currentUser.username 으로 해결하기 힘들어서 임시방편으로 만듬...
        getCurrentUser()
            .then(response => {
                if(response.username === params.username){
                    setProfileCheck(true)
                }
                else {
                    setProfileCheck(false)
                }
            })
    },[])

    useEffect(() => {
        loadUserProfile(params.username)

        getCurrentUser()
            .then(response => {
                if(response.username === params.username){
                    setProfileCheck(true)
                }
                else {
                    setProfileCheck(false)
                }
            })
    }, [params.username])

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

    const pushEditComponent = () => {
        history.push("/accounts/edit")
    }

    return (
        <div className="profile">

            {
                user ? (
                    <div className="user-profile">
                        <div className="user-profile-body">
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
                                    {
                                        profileCheck ? (
                                            <div>
                                                <Button 
                                                    onClick={pushEditComponent}
                                                >
                                                    Edit
                                                </Button>
                                                <div>
                                                    <span>Follower : {user.totalFollowers}</span>
                                                    <span>  /  </span>
                                                    <span>Following : {user.totalFollowings}</span>
                                                </div>    
                                            </div>
                                            
                                        ) : (
                                            <Follow 
                                                user={user} currentUser={props.currentUser} 
                                                totalFollower={user.totalFollowers} totalFollowing={user.totalFollowings}
                                            />
                                        )
                                    }
                                </div>
                                <div className="user-summary">
                                    <div className="full-name">{user.name}</div>
                                    <div className="username">{user.username}</div>
                                    <div className="user-joined">
                                        Joined {formatDateTime(user.joinedAt)}
                                    </div>
                                </div>
                                <div className="user-bio-container">
                                    Bio : {user.bio}
                                </div>
                            </div>
                            <div className="user-bloom-container">
                                {
                                    user.postCount <= 5 ? (
                                        <img src={first} className="bloom"/>
                                    ) : (
                                        user.postCount <= 10 ? (
                                            <img src={second} className="bloom"/>
                                        ) :(
                                            user.postCount <= 15 ? (
                                                <img src={thrid} className="bloom"/>
                                            ) : (
                                                    <img src={fourth} className="bloom"/>
                                            )
                                        )
                                    )
                                }
                            </div>
                        </div>
                        <div className="user-post-list">
                            <PostList currentUser={props.currentUser} username={user.username} type="USER_CREATED_POSTS"/>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default Profile;