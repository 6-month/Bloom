import React, {useState, useEffect } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, matchPath } from 'react-router-dom';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import {saveComment} from '../util/APIUtils';
import HashMap from 'hashmap';
import ArrayList from "arraylist";

const FormItem = Form.Item;

function ReplyComments({postId,p_comment_id, pComment}) {
    const [commentContents, setCommentContents] = useState("");
    const [comments, setComments] = useState(pComment);

    const recommentSubmit = (e) => {
        e.preventDefault()

        if(commentContents === "") {
            notification.warn({
                message : "Bloom",
                description : "Please enter comments.."
            })
        }

        setCommentContents("");

        const commentRequest = {
            postId : postId,
            p_comment_id : p_comment_id,
            text : commentContents,
        }
        console.log(commentRequest);

        saveComment(commentRequest)
            .then(response => {
                setComments(comments.concat(response));
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered comments"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : "Failed registered commnet..."
                })
            })
    }

    const commentView = [];

    if(pComment !== null) {
        comments.forEach((comment) => {
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
                />
            )
        })
    }


    return (
        <div className="re-comment-container">
            {commentView}
            <form className="comment-form">
                <input 
                    type="text"
                    onChange={(e) => setCommentContents(e.target.value)}
                    placeholder="Please enter comments.."
                />
                <button
                    onClick={recommentSubmit}
                >
                    Add
                </button>
            </form>
        </div>
    );
}

function Comments({post}) {
    const [commentContents, setCommentContents] = useState("");
    const [comments, setComments] = useState(post.comments);

    var map = new HashMap();
        
    comments.forEach((comment) => {
        if(comment.p_comment_id !== null) {
            if(map.get(comment.p_comment_id) === undefined) {
                var list = new ArrayList()
                list.add(comment);
                map.set(comment.p_comment_id, list)
            }
            else {
                var list = map.get(comment.p_comment_id);
                list.add(comment);
                map.set(comment.p_comment_id, list)
            }
        }    
    })

    const commentView = [];

    comments.forEach((comment) => {
        if(comment.p_comment_id === null) {
            if(map.get(comment.id) !== undefined ) {
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
                        <ReplyComments postId={post.id} p_comment_id={comment.id} pComment={map.get(comment.id)} />
                    </Comment>
                )

            }
            
            else {
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
                        <ReplyComments postId={post.id} p_comment_id={comment.id} pComment={null}/>
                    </Comment>
                )
            }
        }
    })

    const commentSubmit = (e) => {
        e.preventDefault()

        if(commentContents === "") {
            notification.warn({
                message : "Bloom",
                description : "Please enter comments.."
            })
            setCommentContents("");
        }
        // 공백일 때 comment가 저장되는 문제가 남아있음

        const commentRequest = {
            postId : post.id,
            p_comment_id : null,
            text : commentContents,
        }
        console.log(commentRequest);

        saveComment(commentRequest)
            .then(response => {
                setComments(comments.concat(response));
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered comments"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : "Failed registered commnet..."
                })
            })
    }


    

    return (
        <div className="comment-container">
            {commentView}
            <form className="comment-form">
                <input 
                    type="text"
                    onChange={(e) => setCommentContents(e.target.value)}
                    placeholder="Please enter comments.."
                />
                <button
                    onClick={commentSubmit}
                >
                    Add Comment
                </button>
            </form>
        </div>
        
    );
}

export default Comments;