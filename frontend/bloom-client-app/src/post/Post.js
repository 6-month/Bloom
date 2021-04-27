import React, {useState, useEffect } from 'react';
import { Avatar, Icon, Radio, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { RadioGroup } from '@material-ui/core';


function Post({posts}) {
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
        console.log("posts : " +posts);
    },[])
    return (
        <div className="post-content">
            <h2>Post</h2>
        </div>
    );
}

export default Post;