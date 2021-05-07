import React, {useState, useEffect, createElement } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { RadioGroup } from '@material-ui/core';
import './Post.css'
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import {saveComment} from '../util/APIUtils';

const FormItem = Form.Item;

function Post({post}) {
    const [text, setText] = useState("");
    const [comments, setComments] = useState(null);

    useEffect(() => {
        setComments(post.comments);
    }, [])
    
    
    useEffect(() => {
        console.log(comments)
        console.log(typeof comments)
    }, [comments])

    const handleChangeComment = () => {

        const commentRequest = {
            postId : post.id,
            p_comment_id : null,
            text : text,
        };

        console.log(commentRequest);

        saveComment(commentRequest) 
            .then(response => {
                notification.success({
                    message: 'Bloom',
                    description: "Successfully saved",
                })
                // window.location.replace("/");
                setComments(response);
            })
            .catch(error => {
                notification.error({
                    message: 'Bloom',
                    description: error.message || "Something was Wrong"
                })
            })
    }

    const commentView = [];
    post.comments.forEach((comment) => {
        if(comment.p_comment_id === null) {
            commentView.push(
                <Comment
                    author={comment.createdBy.username}
                    avatar={
                        <Avatar className="post-creator-avatar"
                            src={`data:image/jpeg;base64,${comment.createdBy.profileImage}`} />  
                    }
                    content={
                        <p>
                            {comment.text}
                        </p>
                    }
                    datetime={
                        <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                            <span>{moment().fromNow()}</span>
                        </Tooltip>
                    }
                >

                </Comment>
            )
        } else {
            commentView.push(
                <h3>{comment.text}</h3>
            )
        }
    })

    return (
        <div className="post-content">
            <div className="post-header">
                <div className="post-creator-info">
                    <Link className="creator-link">
                        <Avatar className="post-creator-avatar"
                            src={`data:image/jpeg;base64,${post.createdBy.profileImage}`}>  
                            {post.createdBy.name}
                        </Avatar>
                        <span className="post-creator-name">
                            {post.createdBy.name}
                        </span>
                        <span className="post-creator-username">
                            {post.createdBy.username}
                        </span>
                        <span className="post-creation-date">
                            {post.creationDateTime}
                        </span>
                    </Link>
                </div>
                <div className="post-content">
                    {post.content}
                </div>
                <div className="post-image-container">
                   {
                    post.images.map((image) => 
                        <img src={`data:image/jpeg;base64,${image.data}`} className= "post-image"/>
                        )
                   }
                </div>
                
                <div className="post-comment-container">
                    {commentView}
                    <Form
                        onFinish={handleChangeComment}
                        className="comment-form"
                        requiredMark="true"
                    >
                        <FormItem
                            label="Comment.."
                        >
                            <Input 
                                size="large"
                                name="text"
                                autoComplete="off"
                                placeholder="please enter Comments.."
                                allowClear="true"
                                onChange={(e) => {setText(e.target.value)}}
                            />
                        </FormItem>
                        <FormItem>
                            <Button type="primary" 
                                htmlType="submit" 
                                size="large" 
                                className="signup-form-button"
                            >
                                Add Comment
                            </Button>
                        </FormItem>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Post;