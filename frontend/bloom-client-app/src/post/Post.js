import React, {useState, useEffect, createElement } from 'react';
import { Avatar, Icon, Radio, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { RadioGroup } from '@material-ui/core';
import './Post.css'
import { Comment, Tooltip } from 'antd';
import moment from 'moment';
import { DislikeOutlined, LikeOutlined, LikeFilled } from '@ant-design/icons';


function Post({post}) {
    // const [content, setContent ] = useState('')
    // const [images, setImages] = useState(null);
    // const [createdBy, setCreatedBy]= useState({
    //     id : null,
    //     name : '',
    //     username : ''
    // })
    // const [creationDateTime, setCreationDateTime] = useState("");
    // const [pushedLike, setPushedLike] = useState(null);
    // const [totalLikes, setTotalLikes] = useState(null);
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    // 현재 like수 와 like를 누르는 기능 구현
    const like = () => {
        setLikes(1);
        setAction('liked');
    };

    // comment를 다는 기능과 comment에 comment를 다는 기능 구현 필요 

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
            <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
      ];

    const commentView = [];
    post.comments.forEach((comment) => {
        if(comment.p_comment_id === null) {
            commentView.push(
                <Comment
                    actions={actions}
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
                </div>
            </div>
        </div>
    );
}

export default Post;