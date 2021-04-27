import React, { useState } from 'react';
import { login } from '../../util/APIUtils';
import { ACCESS_TOKEN } from '../../constants';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, notification} from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  
function Login() {
    let history = useHistory();

    const onFinish = (values) => {
        const loginRequest = Object.assign({}, values);
        login(loginRequest)
            .then(response => {
                localStorage.setItem(ACCESS_TOKEN, response.accessToken);
                notification.success({
                    message: 'Bloom',
                    description: "You're successfully logged in.",
                  });
                history.push({
                    pathname : '/post/new',
                })
            })
            .catch(error => {
                if(error.status === 401) {
                    notification.error({
                        message: 'Bloom',
                        description: 'Your Username or Password is incorrect. Please try again!'
                    });                      
                } else {
                    notification.error({
                        message: 'Bloom',
                        description: error.message || 'Sorry! Something went wrong. Please try again!'
                    });                                         
                }
            })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <Form   
            {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="usernameOrEmail"
                rules={[{ required: true, message: 'Please input your username!' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
            </Form.Item>
        </Form>
    );
}

export default Login;