import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import { POST_LIST_SIZE } from '../constants';
import {getAllPosts, getUserCreatedPosts, getUserlikedPosts} from '../util/APIUtils'
import {Button } from 'antd';
import Post from './Post';
import Icon from '@ant-design/icons';
import "./PostList.css";

function PostList(props) {
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
        if(props.type === "USER_CREATED_POSTS") {
            promise = getUserCreatedPosts(props.username, page, size)
        }
        else {
            promise = getAllPosts(page, size);
        }
        if(!promise){
            return ;
        }
        setIsLoading(true);

        promise 
            .then(response => {
                console.log(response)
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
    // useEffect(() => {
    //     if()
    // },[])

    const handleLoadMore = () => {
        loadPostList(page +1);
    }

    // comment 의 p_comment_id 별로 list를 만들고 add 작업이 필요함
    const postViews = [];
    posts.forEach((post) => {
        postViews.push(
            <Post 
                post = {post}
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