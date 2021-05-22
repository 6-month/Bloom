import { notification } from 'antd';
import React, { useEffect, useState } from 'react';
import {addLike, cancelLike} from '../util/APIUtils';
import "./Like.css"

function Likes({postId, pushedLike, totalLikes}) {
    const [tLike, setTotalLikes] = useState(totalLikes);
    const [pLike, setPushedLike] = useState(pushedLike);

    const handleSaveLike = (e) => {
        e.preventDefault();

        const likeRequest ={
            postId : postId,
            checkedLike : true
        }
        console.log(likeRequest)

        addLike(likeRequest)
            .then(response => {
                console.log(response)
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


    const handleCancelLike = (e) => {
        e.preventDefault();

        const likeRequest ={
            postId : postId,
            checkedLike : false
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
                    <div>
                        <span>Liked by : {tLike}</span>
                        <form >
                            <button type="submit" onClick={handleCancelLike}>like</button>
                        </form>
                    </div>
                ) : (
                    //like save
                    <div>
                        <span>Liked by : {tLike}</span>
                        <form >
                            <button type="submit" onClick={handleSaveLike}>like</button>
                        </form>
                    </div>
                )
            }
        </div>
    );
}

export default Likes;