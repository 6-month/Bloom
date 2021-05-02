import React, {useState, useEffect } from 'react';
import { Avatar, Icon, Radio, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { RadioGroup } from '@material-ui/core';


function Post({post}) {
    const [content, setContent ] = useState('')
    const [images, setImages] = useState(null);
    const [createdBy, setCreatedBy]= useState({
        id : null,
        name : '',
        username : ''
    })
    const [creationDateTime, setCreationDateTime] = useState("");
    const [pushedLike, setPushedLike] = useState(null);
    const [totalLikes, setTotalLikes] = useState(null);

    useEffect(() => {
        // console.log(post);
        // const image = post.images;
        // post.images.map((image) => {
        //     console.log(image.imageId)
        //     console.log(image.data)
        // })
        console.log(post.comments)
    }, [])

    const commentView = [];
    post.comments.forEach((comment) => {
        if(comment.p_comment_id === null) {
            commentView.push(
                <h1>{comment.text}</h1>
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
                            style={{ backgroundColor: getAvatarColor(post.createdBy.name)}}>  
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
                <div className="post-image">
                   {
                    post.images.map((image) => 
                        <img src={`data:image/jpeg;base64,${image.data}`} />
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