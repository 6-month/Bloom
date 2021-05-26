import Avatar from 'antd/lib/avatar/avatar';
import React ,{useEffect, useState } from 'react';
import PostList from '../../post/PostList';
import ProfilePostList from './ProfilePostList';
import Follow from '../follow/Follow';
import {  getCurrentUser, getUserProfile } from '../../util/APIUtils';
import {getAvatarColor} from '../../util/Colors';
import { formatDateTime } from '../../util/Helpers';
import "./ProfilePostList.css";
import EditProfile from './EditProfile';
import { Button } from 'antd';
import {useHistory} from "react-router-dom"

function Profile(props) {
    // console을 한번 찍을줄 알았는데 4번 찍는다 이유는?
    const history = useHistory();

    let params = props.match.params;
    const [profileCheck, setProfileCheck] = useState(null);  
    const [user, setUser] = useState(null);
    
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

    useEffect(() => {
        console.log(user)
    }, [user])

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
                                                    <span>totalFollowers : {user.totalFollowers}</span>
                                                    <span>totalFollowings : {user.totalFollowings}</span>
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
                                <div className ="user-profile-post">
                                    profile-post : 
                                    <img src={`data:image/jpeg;base64,${user.profilePost}`} className= "post-image"/>
                        
                    
                                </div>
                                <div className="user-bio-container">
                                    Bio : {user.bio}
                                </div>
                            </div>
                            <div className="user-flower-container">
                                <span></span>
                            </div>
                        </div>
                        <div className="user-post-list">
                            <ProfilePostList currentUser={props.currentUser} username={user.username} type="USER_CREATED_POSTS"/>
                        </div>
                    </div>
                ) : null
            }
        </div>
    );
}

export default Profile;