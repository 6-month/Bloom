import React, {  useEffect, useState } from 'react';
import {Form, Input, notification, Button} from 'antd';
import { ACCESS_TOKEN, API_BASE_URL } from '../constants';
import {post} from 'axios';
import { useHistory } from 'react-router-dom';
import "./NewPost.css";

const {TextArea} = Input;

function NewPost() {
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
    if(content.value.length <10) {
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
  

  const handleSubmit = () => {
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
    <Form 
      onFinish={handleSubmit} 
      requiredMark="true" 
      encType="multi" 
      // className="new-post-form"
      style={{ 
        marginTop: '100px',
        marginBottom: '100px',
        marginLeft: '30px',
        border: '1px solid black',
        width: '80vw',
        height: '70vh',
        display: 'flex',

            }}
    >
      
      <Form.Item>
        <input 
          type="file" 
          onChange={(e) => {onChangedImages(e)}}
          className="image-upload"
        />
      </Form.Item>
      <Form.Item>
        <TextArea 
          placeholder="Enter your Content"
          style = {{ fontSize: '16px' }} 
          autosize={{ minRows: 3, maxRows: 6 }} 
          name = "content"
          onChange = {(e) => {onChangedContent(e)}} 
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" 
            htmlType="submit" 
            size="large"
            disabled={isFormInvalid()}
        >
        Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default NewPost;