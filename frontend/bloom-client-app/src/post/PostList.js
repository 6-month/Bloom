import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import { POST_LIST_SIZE } from '../constants';
import {getAllPosts, getUserCreatedPosts, getUserlikedPosts} from '../util/APIUtils'
import {Button } from 'antd';
import Post from './Post';
import Icon from '@ant-design/icons';
import "./PostList.css";

function PostList({currentUser, isAuthenticated, onLogout, username, type}) {
    const [posts, setPosts] =useState([]);

    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalElements, setTotalElements] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [isLast, setIsLast] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadPostList();
    },[])

    const loadPostList = (page = 0, size = POST_LIST_SIZE) => {
        let promise;
        if(username) {
            if(type === "USER_CREATED_POSTS") {
                promise = getUserCreatedPosts(username, page, size)
            }
        } 
        else {
            promise =  getAllPosts(page, size);
        }
        if(!promise) {
            return;
        }
        
        setIsLoading(true);

        promise 
            .then(response => {
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

    const handleLoadMore = () => {
        loadPostList(page +1);
    }

    const postViews = [];
    posts.forEach((post) => {
        postViews.push(
            <Post 
                post = {post}
                currentUser = {currentUser}
            />
        )
    })
    return (
        <div className="posts-container">
            {postViews}
            {
                isLoading && posts.length === 0 ? (
                    <div className="no-posts-found">
                        <span>No Posts found</span>
                    </div>
                ) : null
            } 
            {
                !isLoading && isLast ? (
                    <div className="load-more-polls"> 
                        <Button type="dashed" onClick={handleLoadMore} disabled={isLoading}>
                            <Icon type="plus" /> Load more
                        </Button>
                    </div>): null
            }
            {
                isLoading ? 
                <LoadingIndicator /> : null
            }
        </div>
    );
}

export default PostList;