import React, {useState, useEffect } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, matchPath } from 'react-router-dom';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import {saveComment, deleteComment, updateIsDeletedComment} from '../util/APIUtils';
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

    const handleDeleteComment = (e, commentId) => {
        e.preventDefault();
    
        updateIsDeletedComment(commentId) 
            .then(response => {
                for(var i = 0; i< comments.length; i++) {
                    if(comments[i].id === response.id) {
                        setComments(comments.concat(comments.pop(comments[i])))
                        setComments(comments.concat(response))
                    }
                }
                notification.success({
                    message : "Bloom",
                    description : "Successfully deleted comments"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed deleted commnet..."
                })
            })
    }

    useEffect(() => {

    }, [])

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
                >
                    {
                        comment.text !== "Deleted Comment" ? (
                            <Button onClick={(e)=> handleDeleteComment(e, comment.id)}>delete</Button>
                        ) : (
                            null
                        )
                    }    
                    </Comment>
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

    // useEffect(() => {
    //     comments.forEach(comment => {
    //         // if(comment.p_comment_id === null) {
    //         //     console.log(comment)
    //         // }
    //         console.log(comment)
    //     })
    // }, [comments])

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
    

    const handleDeleteComment = (e, comment) => {
        e.preventDefault();
    
        let commentId = comment.id;

        deleteComment(commentId) 
            .then(response => {
                for(var i = 0; i< comments.length; i++) {
                    if(comments[i].p_comment_id === null) {
                        if(comments[i].id === commentId) {
                            console.log(comments[i])
                            setComments(comments.concat(comments.pop(comments[i])))
                            setComments(comments)
                        }
                    }
                }
                console.log(comments)
                notification.success({
                    message : "Bloom",
                    description : "Successfully deleted comments"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed deleted commnet..."
                })
            })
    }

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
                        <Button onClick={(e) => handleDeleteComment(e, comment)}>delete</Button>
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
                        <Button onClick={(e) => handleDeleteComment(e, comment)}>delete</Button>
                        <ReplyComments postId={post.id} p_comment_id={comment.id} pComment={[]}/>
                    </Comment>
                )
            }
        }
    })

    return (
        <div className="comment-container">
            {commentView}
            <form className="comment-form">
                <input 
                    type="text"
                    onChange={(e) => handleCommentChange(e)}
                    placeholder="Please enter coments.."
                    className="input-container"
                />
                <button
                    disabled={commentContents.validateStatus}
                    onClick={commentSubmit}
                    className="button-container"
                >
                    Add Comment
                </button>
            </form>
        </div>
        
    );
}

export default Comments;