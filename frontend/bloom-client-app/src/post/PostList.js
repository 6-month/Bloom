import React, { useEffect, useState } from 'react';
import { POST_LIST_SIZE } from '../constants';
import {getAllPosts, getUserCreatedPosts, getUserlikedPosts} from '../util/APIUtils'
import Post from './Post';

function PostList({username, type}) {
    const [posts, setPosts] =useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [last, setLast] = useState(true);
    const [currentLikes, setCurrentLikes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    // const loadPostList = (page = 0, size = POST_LIST_SIZE) => {
    //     let promise;
    //     if(username) {
    //         if(type == "USER_CREATED_POSTS") {
    //             promise = getUserCreatedPosts(username, page, size);
    //             console.log(promise)
    //         } else if(type == "USER_LIKES_POSTS") {
    //             promise = getUserlikedPosts(username, page, size);
    //         } 
    //     }
    //     else {
    //         promise = getAllPosts(page, size);
    //         console.log(promise)
    //     }

    //     if(!promise) {
    //         return ;
    //     }

    //     setIsLoading(true);

    //     promise 
    //         .then(response => {
    //             const posts = posts.silce();
    //             const currentLikes = currentLikes.slice();

    //             setPosts(posts.concat(response.content));
    //             setPage(response.page);
    //             setSize(response.size);
    //             setTotalElements(response.totalElements);
    //             setTotalPages(response.totalPages)
    //             setLast(response.last)
    //             setCurrentLikes(currentLikes.concat(Array(response.content.length)));
    //             setIsLoading(true)
    //         })
    //         .catch(error => {
    //             setIsLoading(false);
    //         })
    // }
    // const postViews = [];
    // posts.forEach((post, postIndex) => {
    //     postViews.push(<Post 
    //             key = {post.id}
    //             post = {post}
                
    //     />)
    // })
    return (
        <div>
            
        </div>
    );
}

export default PostList;