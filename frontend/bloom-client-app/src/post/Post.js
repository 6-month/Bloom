
import React, {useState, useEffect, createElement } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, Route, useHistory } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { SettingOutlined } from '@ant-design/icons';

import './Post.css'
import Comments from './Comments';
import Likes from "./Likes";
import Profile from "../user/profile/Profile";
import {deletePost} from "../util/APIUtils";

const FormItem = Form.Item;

function Post({post, currentUser}) {
    // delte 후 response로 post들의 정보를 받고 state로 관리해야할것 같음..

    let history = useHistory();
    const profileURL ="/users/" + post.createdBy.username;

    const [setting, setSetting] = useState(false);

    useEffect(() => {
        if(currentUser.username == post.createdBy.username) {
            setSetting(true)
        }
        // notification.button({
        //     message : "Bloom",
        //     description: "Are you sure you want to delete it? Once deleted, it cannot be recovered.",
    
        // })
    }, [])

    const deltePostSubmit = () => {    
        deletePost(post.id)
            .then(response => {
                notification.success({
                    message : "Bloom",
                    description: "Successfully deleted post"
                })
                window.location.replace("/");
            }) 
            .catch(error => {
                notification.error({
                    message: "Bloom",
                    description: error.message
                })
            })
    }

    return (
        <div className="post-content">
            <div className="post-header">
                <div className="post-creator-info">
                    <div className="post-creator-profile-image">
                        <Link className="creator-link">
                            <Avatar className="post-creator-avatar"
                                src={`data:image/jpeg;base64,${post.createdBy.profileImage}`}>  
                            </Avatar>
                        </Link>
                    </div>
                    <div className="post-creator-detail">
                        <span className="post-creator-name">
                            {post.createdBy.name}
                        </span>
                        <span className="post-creator-username">
                            <Link to={profileURL}>
                                {post.createdBy.username}
                            </Link>
                        </span>
                    </div>
                    <div className="post-setting-container">
                        {
                            setting ? (
                                <Button 
                                    icon={
                                        <SettingOutlined />
                                    }
                                    onClick={deltePostSubmit}
                                >
                                    delete
                                </Button>
                            ) : (
                                null
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="post-body">
                <div className="post-image-container">
                    {
                    post.images.map((image) => 
                        <img src={`data:image/jpeg;base64,${image.data}`} className= "post-image"/>
                        )
                    }
                </div>
                <div className="post-text">
                    {post.content}
                </div>
                <div className="post-like-container">
                    <Likes postId={post.id} pushedLike={post.pushedLike} totalLikes={post.totalLikes} />
                </div>
                <div className="post-comment-container">
                    <Comments post={post} />
                </div>
            </div>
        </div>
    );
}

export default Post;