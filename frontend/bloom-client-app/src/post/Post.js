
import React, {useState, useEffect, createElement } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, Route } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { RadioGroup } from '@material-ui/core';

import './Post.css'
import Comments from './Comments';
import Likes from "./Likes";
import Profile from "../user/profile/Profile";

const FormItem = Form.Item;

function Post({post, currentUser}) {
    useEffect(() => {
        console.log(post.createdBy)
    },[])

    const profileURL ="/users/" + post.createdBy.username;

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