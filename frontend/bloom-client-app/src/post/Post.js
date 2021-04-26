import React from 'react';
import { Avatar, Icon, Radio, Button } from 'antd';
import { Link } from 'react-router-dom';
import { getAvatarColor } from '../util/Colors';
import { formatDateTime } from '../util/Helpers';
import { RadioGroup } from '@material-ui/core';


function Post(props) {
    return (
        <div className="post-content">
            <div className="post-header">
                <div className="post-creator-info">
                    <Link className="creator-link">
                        <Avatar className="post-creator-avatar"
                            style="">
                        </Avatar>
                        <span className="post-creator-name">

                        </span>
                        <span className="post-creator-username">

                        </span>
                        <span className="post-creation-date">

                        </span>
                    </Link>
                </div>
            </div>
            <div className="post-body">
                <div className="post-image">

                </div>
                <div className="post-content">

                </div>
                <div className="post-like">
                    <RadioGroup
                     className="post-like-radio"
                    //  onChange={}
                    //  value={}
                    >
                        
                    </RadioGroup>
                </div>
            </div>
        </div>
    );
}

export default Post;