import React, {useState, useEffect, createElement } from 'react';
import { Avatar, Input, Button, notification, Form } from 'antd';
import { Link, Route } from 'react-router-dom';
import { getAvatarColor } from '../../util/Colors';
import { formatDateTime } from '../../util/Helpers';
import { SettingOutlined } from '@ant-design/icons';
import Modal from '../modal/modal'
import './ProfilePost.css'
import Comments from '../../post/Comments';
import Likes from "../../post/Likes";
import Profile from "./Profile";
import {deletePost} from "../../util/APIUtils";

const FormItem = Form.Item;

function ProfilePost({modal, post, currentUser}) {
   const profileURL ="/users/" + post.createdBy.username;

   const [setting, setSetting] = useState(false);

   const [ modalOpen, setModalOpen ] = useState(false);

   const openModal = () => {
       setModalOpen(true);
              
       
   }
   const closeModal = () => {
       setModalOpen(false);
   }


   useEffect(() => {
        if(currentUser.username == post.createdBy.username) {
            setSetting(true)
        }
        console.log(post)
    }, [])

    

    const deltePostSubmit = () => {
        deletePost(post.id)
            .then(response => {
                notification.success({
                    message : "Bloom",
                    description: response.message
                })
                window.location.replace(profileURL);
            }) 
            .catch(error => {
                notification.error({
                    message: "Bloom",
                    description: error.message
                })
            })
    }


    return (
            
                <div className="profile-post-image-container">
                    {
                    post.images.map((image) => 
                        <img onClick = {openModal} src={`data:image/jpeg;base64,${image.data}`} className= "post-image"/>
                        )
                    }
                    <Modal open = { modalOpen} close = { closeModal } header = "HEAD">
                        {
                        post.images.map((image) => 
                            <img onClick = {openModal} src={`data:image/jpeg;base64,${image.data}`} className= "post-image"/>
                            )
                        }
                        {post.content}
                    </Modal>
                </div>
    );
}

export default ProfilePost;