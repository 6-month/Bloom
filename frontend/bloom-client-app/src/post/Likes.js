import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {addLike, cancelLike} from '../util/APIUtils';
import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import './Likes.css'

function Likes({postId, pushedLike, totalLikes}) {
    const [tLike, setTotalLikes] = useState(totalLikes);
    const [pLike, setPushedLike] = useState(pushedLike);

    const handleSaveLike = (e) => {
        e.preventDefault();

        const likeRequest ={
            postId : postId,
            pushedLike : true
        }

        addLike(likeRequest)
            .then(response => {
                setTotalLikes(response.totalLikes)
                setPushedLike(response.pushedLike)
                notification.success({
                    message : "Bloom",
                    description : "Successfully registered likes"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed registered likes..."
                })
            })
    }

    // cancel 부분 수정이 필요함
    const handleCancelLike = (e) => {
        e.preventDefault();

        const likeRequest ={
            postId : postId,
            pushedLike : false
        }

        cancelLike(likeRequest)
            .then(response => {
                setTotalLikes(response.totalLikes)
                setPushedLike(response.pushedLike)
                notification.success({
                    message : "Bloom",
                    description : "Successfully canceled likes"
                })
            })
            .catch(error => {
                notification.error({
                    message : "Bloom",
                    description : error.message || "Failed registered likes..."
                })
            })
    }

    return (
        <div>
            {
                pLike ? (
                    // like cancel
                    <div className="like-container">
                        <form 
                            className="like-form"
                            type="submit" 
                            onClick={handleSaveLike}
                        >
                            <HeartOutlined 
                            />
                        </form>
                        <div>{tLike}명이 좋아합니다.</div>
                    </div>
                ) : (
                    //like save
                    <div className="like-container">
                        <form 
                            className="like-form"
                            type="submit"
                            onClick={handleSaveLike}
                        >
                            <HeartFilled
                                style={{
                                    color: "#D5C6E3",
                                    width: "24px"
                                }}  />
                        </form>
                        <div className="like-sentences">
                            {tLike}명이 좋아합니다.
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default Likes;