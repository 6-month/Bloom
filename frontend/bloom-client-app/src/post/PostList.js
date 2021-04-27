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
    const [isLast, setIsLast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPostList()
        console.log(posts)
    },[])

    const loadPostList = (page = 0, size = POST_LIST_SIZE) => {
        let promise = getAllPosts(page, size);
        
        setIsLoading(true);

        promise 
            .then(response => {
                console.log(response);
                setPosts(response.content);
                setPage(response.page);
                setSize(response.size);
                setTotalElements(response.totalElements);
                setTotalPages(response.totalPages);
                setIsLast(response.isLast);
                
            })
            .catch(error => {
                setIsLoading(false);
            })
    }
    
    return (
        <div>
            
        </div>
    );
}

export default PostList;