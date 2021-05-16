import React, {  useEffect, useState } from 'react';
import {Avatar,notification, Button} from 'antd';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import {post} from 'axios';
import { useHistory } from 'react-router-dom';
import "./NewPost.css";

function NewPost({currentUser}) {
  useEffect(() => {
    console.log(currentUser.profileImage)
  }, [])

  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1; 
  let date = today.getDate();    
  let history = useHistory();
  
  const [content, setContent] = useState({
    value : ''
  });
  const [images, setImages] = useState({
    value : [],
  });

  const isFormInvalid = () => {
    return !(
      content.validateStatus === 'success' &&
      images.validateStatus === 'success' 
    )
  }

  const onChangedContent = (e) => {
    var {value} = e.target;

    setContent({
      ...content,
      value : value,
      ...validateContent()
    })
  }

  const onChangedImages = (e) => {
    setImages({
      ...images,
      value : [...images.value, {value : e.target.files[0]}],
      validateStatus : 'success',
      errorMsg : null
    });
  }

  const validateContent = () => {
    if(content.value.length <4) {
      return {
        validateStatus : 'error',
        errorMsg : 'Content is too short'
      }
    }
    else {
      return {
        validateStatus : 'success',
        errorMsg : null
      };
    }
  }
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content',content.value);

    for(var i = 0; i<images.value.length; i++) {
      formData.append('images', images.value[i].value);
    }

    const config = {
      headers : {
        'Content-Type' : 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    }

    for(var keyValue of formData) {
      console.log(keyValue)
    }
 
    return post(API_BASE_URL+'/posts', formData, config)
      .then(response => {
        notification.success({
          message : 'Bloom',
          description : 'Successfully create post!'
        })
        // window.location.replace("/bloom"); 
        history.push("/bloom")


      })
      .catch(error => {
        notification.error({
          message : 'Bloom',
          description : error.message || 'Sorry Somthing was wrong'
        })
      })

  }

  return (
    <div className="new-post-container">
      <form className="new-post-form">
        <div className="new-post-imageUpload">
          <label className="input-file-button" for="new-post-image">UpLoad</label>
          <input 
              type="file" 
              onChange={(e) => {onChangedImages(e)}}
              id="new-post-image"
              style={{display:"none"}}
            />
        </div>
        <div className="new-post-sidecontainer">
          <div className="new-post-creator">
            <div className="creator-detail-avatar">
              <Avatar 
                  style={{
                    width:"70px",
                    height:"70px",
                    marginRight:"20px",
                  }}
                  src={`data:image/jpeg;base64,${currentUser.profileImage}`}
              />
            </div>
            <div className="creator-detail-username">
              <span className="username">{currentUser.username}</span>
              <span className="date">{year + '/' + month + '/' + date}</span>
            </div>
          </div>
          <input 
            type="text" 
            onChange = {(e) => {onChangedContent(e)}}
            className="new-post-content"
            placeholder="Pleas enter content..."
          />
          <Button 
            type="primary" 
            htmlType="submit" 
            size="large"
            disabled={isFormInvalid()}
            onClick={handleSubmit}
            className="new-post-btn"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NewPost;