import React, { useEffect, useState } from 'react';
import { Route,  useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Login from '../user/login/Login';
import NewPost from '../post/NewPost';
import Signup from '../user/signup/Signup';
import PostList from '../post/PostList';
import Profile from '../user/profile/Profile';
import AppHeader from '../common/AppHeader';
// import AppHeader from '../common/Header';

import Intro from '../common/Intro';

import 'antd/dist/antd.css';
import LoadingIndicator from '../common/LoadingIndicator';
import {Layout ,Button, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import PrivateRoute from '../common/PrevateRoute';

function App() {    
    let history = useHistory();

    const [currentUser, setCurrentUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    notification.config({
        placement: 'topRight',
        top: 70,
        duration: 3,
    }); 

    // 문제 => 로그인 이후에 바로 Header가 전환되지 않고 새로 고침이후에 전환된다.
    useEffect(() => {
      if(localStorage.getItem(ACCESS_TOKEN) !== null) {
        loadCurrentUser();
      }
      else {
        history.push("/login");
      }

      return () => {
        loadCurrentUser();
      }
    },[])

    const loadCurrentUser = () => {
        setIsLoading(true);
        
        getCurrentUser() 
            .then(response => {
                setCurrentUser(response);
                setIsAuthenticated(true);
                setIsLoading(false);
            })
            .catch(error => {
                setIsLoading(false);
            });
    }

    const handleLogout = (redirectTo="/", notificationType="success", description="You're successfully logged out.") => {
        localStorage.removeItem(ACCESS_TOKEN);
        
        setCurrentUser(null);
        setIsAuthenticated(false);

        notification[notificationType]({
          message: 'Bloom',
          description: description,
        });
        window.location.replace("/")
    }  
    if(isLoading) {
      return <LoadingIndicator />
    }

    return (  
      <Layout className="app-container">
          <AppHeader 
            isAuthenticated={isAuthenticated}
            currentUser={currentUser} 
            onLogout={handleLogout} 
          />
        <Content className="app-content">
          <Route 
            exact path="/"
            component={Intro}
          />
          <Route 
            path="/bloom" 
            render = {(props) => 
              <PostList 
                {...props}
                isAuthenticated={isAuthenticated} 
                currentUser={currentUser} 
                handleLogout={handleLogout}
              />}
          />
          <Route 
            path="/login" component={Login}
          />
          <Route 
            path="/signup" component={Signup} 
          />
          <Route 
            path="/users/:username" 
            render ={(props) => 
              <Profile 
                {...props}
                isAuthenticated={isAuthenticated} 
                currentUser={currentUser} 
              />}
          />
          <PrivateRoute authenticated={isAuthenticated} path="/post/new" component={NewPost} ></PrivateRoute>
        </Content> 
      </Layout>
    );
}

export default App;