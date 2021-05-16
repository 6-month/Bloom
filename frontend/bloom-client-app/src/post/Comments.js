import React, {useState, useEffect } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, matchPath } from 'react-router-dom';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import {saveComment} from '../util/APIUtils';
import HashMap from 'hashmap';
import ArrayList from "arraylist";

// 문제점
// 기존 댓글에 대댓글을 다는건 문제 없이 되지만 새로운 댓글을 생성하고 대댓글을 달때 에러메시지가 뜸, 근데 db에 저장은 됌...

const FormItem = Form.Item;

function ReplyComments({postId,p_comment_id, pComment}) {
    const [commentContents, setCommentContents] = useState({
        value : "",
        validateStatus : "false"
    });
    const [comments, setComments] = useState(pComment);

    useEffect(() => {
        if(comments === null) {
            setComments([]);
        }
    } ,[])

    const handleCommentChange = (e) => {
        setCommentContents({
            ...commentContents,
            value : e.target.value,
            ...isFormValid()
        });
    }

    const isFormValid = () => {
        if(commentContents.value.length<3) {
            return {
                validateStatus : "false"
            }
        }
        else {
            return {
                validateStatus : ""
            }
        }
    }

    const recommentSubmit = (e) => {
        e.preventDefault()

        const commentRequest = {
            postId : postId,
            p_comment_id : p_comment_id,
            text : commentContents.value,
        }

        saveComment(commentRequest)
            .then(response => {
                setComments(comments.concat(response));
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered comments"
                })
            })
            .catch(err => {
                notification.error({
                    message : "Bloom",
                    description : err.message || "Failed registered comments..."
                })
            })
        setCommentContents({
            ...commentContents,
            value : "",
            validateStatus : "false"
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
                    onChange={(e) => handleCommentChange(e)}
                    placeholder="Please enter comments.."
                />
                <button
                    disabled={commentContents.validateStatus}
                    onClick={recommentSubmit}
                >
                    Add
                </button>
            </form>
        </div>
    );
}

function Comments({post}) {
    const [commentContents, setCommentContents] = useState({
        value : "",
        validateStatus : "false"
    })
    
    const [comments, setComments] = useState(post.comments);

    const handleCommentChange = (e) => {
        setCommentContents({
            ...commentContents,
            value : e.target.value,
            ...isFormValid()
        });
    }

    const isFormValid = () => {
        if(commentContents.value.length<3) {
            return {
                validateStatus : "false"
            }
        }
        else {
            return {
                validateStatus : ""
            }
        }
    }

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

        const commentRequest = {
            postId : post.id,
            p_comment_id : null,
            text : commentContents.value,
        }


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
        
        setCommentContents({
            ...commentContents,
            value : commentContents.value,
            validateStatus : "false"
        })
    }

    return (
        <div className="comment-container">
            {commentView}
            <form className="comment-form">
                <input 
                    type="text"
                    onChange={(e) => handleCommentChange(e)}
                    placeholder="Please enter coments.."
                />
                <button
                    disabled={commentContents.validateStatus}
                    onClick={commentSubmit}
                >
                    Add Comment
                </button>
            </form>
        </div>
        
    );
}

export default Comments;