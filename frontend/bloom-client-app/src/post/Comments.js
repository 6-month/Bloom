import React, {useState, useEffect } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link } from 'react-router-dom';
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';
import {saveComment} from '../util/APIUtils';

const FormItem = Form.Item;

// function ReplyComments({postId, pComment}) {
//     const [commentContents, setCommentContents] = useState("");
//     const [comments, setComments] = useState(pComment);
//     useEffect(() => {
//         console.log(pComment)
//     }, [])

//     const recommentSubmit = () => {

//         if(commentContents === "") {
//             notification.warn({
//                 message : "Bloom",
//                 description : "Please enter comments.."
//             })
//         }

//         setCommentContents("");

//         const commentRequest = {
//             postId : postId,
//             p_comment_id : pComment.id,
//             text : commentContents,
//         }
//         console.log(commentRequest);

//         saveComment(commentRequest)
//             .then(response => {
//                 setComments(comments.concat(response));
//                 notification.success({
//                     message : "Bloom",
//                     description : "Successfully registered comments"
//                 })
//             })
//             .catch(error => {
//                 notification.error({
//                     message : "Bloom",
//                     description : "Failed registered commnet..."
//                 })
//             })
//     }

//     return (
//         <div className="re-comment-container">
//             {/* {commentView} */}
//             <form className="re-comment-form">
//                 <input 
//                     type="text"
//                     onChange={(e) => setCommentContents(e.target.value)}
//                     placeholder="Please enter comments.."
//                 />
//                 <button
//                     onClick={recommentSubmit}
//                 >
//                     Add Comment
//                 </button>
//             </form>
//         </div>
//     );
// }

function Comments({post}) {
    const [commentContents, setCommentContents] = useState("");
    const [comments, setComments] = useState(post.comments);

    // useEffect(() => {
    //     console.log(comments);
    // }, [comments])

    const commentSubmit = () => {

        if(commentContents === "") {
            notification.warn({
                message : "Bloom",
                description : "Please enter comments.."
            })
        }

        setCommentContents("");

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
    // const commentView = [];
    // comments.forEach((comment) => {
    //     if(comment.p_comment_id === null) {
    //         commentView.push(
    //             <Comment
    //                 author={comment.createdBy.username}
    //                 avatar={
    //                     <Avatar className="post-creator-avatar"
    //                         src={`data:image/jpeg;base64,${comment.createdBy.profileImage}`} />  
    //                 }
    //                 content={
    //                     <p>
    //                         {comment.text}
    //                     </p>
    //                 }
    //                 datetime={
    //                     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
    //                         <span>{moment().fromNow()}</span>
    //                     </Tooltip>
    //                 }
    //             >
    //                 {/* <ReplyComments postId={post.id} pcomment={comment} /> */}
    //             </Comment>
                
    //         )
    //     }
    // })
    

    return (
        <div className="comment-container">
            {/* {commentView} */}
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