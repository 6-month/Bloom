import React, { useEffect, useState } from 'react';
import { Route,  useHistory, useParams } from 'react-router-dom';
import { getCurrentUser } from '../util/APIUtils';
import { ACCESS_TOKEN } from '../constants';
import Login from '../user/login/Login';
import NewPost from '../post/NewPost';
import Signup from '../user/signup/Signup';
import PostList from '../post/PostList';
import Profile from '../user/profile/Profile';

import 'antd/dist/antd.css';
import AppHeader from '../common/AppHeader';
import LoadingIndicator from '../common/LoadingIndicator';
import NotFound from '../common/NotFound';
import {Layout ,Button, notification } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import PrivateRoute from '../common/PrevateRoute';
import { Switch } from '@material-ui/core';

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

    useEffect(() => {
      loadCurrentUser();
      console.log(currentUser)
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
    }  
    if(isLoading) {
      return <LoadingIndicator />
    }

    return (  
      <Layout className="app-container">
        <AppHeader isAuthenticated={isAuthenticated}
            currentUser={currentUser} 
            onLogout={handleLogout} />
        <Content className="app-content">
          {/* <Route 
            exact path="/" component={PostList} isAuthenticated={isAuthenticated}
              currentUser={currentUser} handleLogout={handleLogout}
          /> */}
          <Route 
            path="/login" component={Login}
          />
          <Route 
            path="/signup" component={Signup} 
          />
          <Route path="/users/:username" 
            >
            <Profile isAuthenticated={isAuthenticated} currentUser={currentUser} />
          </Route>
          <PrivateRoute authenticated={isAuthenticated} path="/post/new" component={NewPost} ></PrivateRoute>
          <Route compoent={NotFound} />
        </Content> 
      </Layout>
    );
}

export default App;