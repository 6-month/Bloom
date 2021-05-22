import React, {  useEffect, useState } from 'react';
import {Avatar,notification, Button} from 'antd';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import {post} from 'axios';
import { useHistory } from 'react-router-dom';
import "./NewPost.css";
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { getAvatarColor } from '../util/Colors';
import { getCurrentUser } from '../util/APIUtils';


function NewPost() {
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1; 
  let date = today.getDate();    
  let history = useHistory();
  
  const [content, setContent] = useState({
    value : ''
  });

  const [currentUser, setCurrentUser] = useState([])

  useEffect(() => {
    getCurrentUser()
      .then(response => {
        setCurrentUser(response)
      })
      .catch(error => {
        console.log(error.message)
      })
  }, [])

  // const [images, setImages] = useState({
  //   value : ''
  // });
  
  // const onChangedImages = (e) => {
  //   setImages({
  //     ...images,
  //     value : [...images.value, {value : e.target.files[0]}],
  //     validateStatus : 'success',
  //     errorMsg : null
  //   });
  // }

  const isFormInvalid = () => {
    return !(
      content.validateStatus === 'success'
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

  const [fileList, setFileList] = useState([]);

  const handleUpload = (info) => {
    setFileList(info.fileList)
  }

  // upload 후에 image를 보여주는 코드
  const onPreview = async file => {
    let src = file.url;
    if (!src) {
      src = await new Promise(resolve => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content',content.value);

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
      console.log(file.originFileObj);
    })

    const config = {
      headers : {
        'Content-Type' : 'multipart/form-data',
        'Authorization' : `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`
      }
    }

    return post(API_BASE_URL+'/posts', formData, config)
      .then(response => {
        notification.success({
          message : 'Bloom',
          description : 'Successfully create post!'
        })
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
            <ImgCrop 
              rotate
              className="imageUpload-container"
            >
              <Upload
                style={{marginLeft:"20px"}}
                listType="picture-card"
                fileList={fileList}
                onChange={handleUpload}
                onPreview={onPreview}
              >
                {fileList && '+ Upload'}
              </Upload>
            </ImgCrop>
        </div>
        <div className="new-post-sidecontainer">
          <div className="new-post-creator">
            <div className="creator-detail-avatar">
              {
                currentUser.profileImage !== null ? ( 
                  <Avatar 
                    style={{
                      width:"70px",
                      height:"70px",
                      marginRight:"20px",
                    }}
                    src={`data:image/jpeg;base64,${currentUser.profileImage}`}
                  />
                ) : (
                  <Avatar 
                    style={{
                      width:"70px",
                      height:"70px",
                      marginRight:"20px",
                      backgroundColor : getAvatarColor(currentUser.name)
                    }}
                  />
                )
              }
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