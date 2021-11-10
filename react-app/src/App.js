import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/Nav/NavBar';
import packageJson from '../package.json';
import { authenticate } from './store/session';
import AuthReminder from './components/Nav/AuthReminder';
import Home from './components/Home/Home.js'
import Profile from './components/Profile/Profile.js';
import HeartPage from './components/Hearts/HeartPage';
import Alert from './components/Alert/Alert';
import { useAlert } from './context/Alert';
import SideBar from './components/Sidebar/SideBar';
import SplashPage from './components/SplashPage/SplashPage';
import PageNotFound from './components/util/PageNotFound';
import NotificationPage from './components/Notifications/NotificationPage';
import { getConnections } from './store/connections';
import { getHeartNotifications, getMessageNotifications } from './store/notification';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const {showAlert} = useAlert()

    const sessionUser = useSelector(state => state.session.user)

    useEffect(() => {
        (async() => {
            await dispatch(authenticate());
            setLoaded(true);
        })();
    }, [dispatch]);

    useEffect(() => {
        if(sessionUser){
            dispatch(getConnections(sessionUser.id))
            dispatch(getMessageNotifications(sessionUser.id))
            dispatch(getHeartNotifications(sessionUser.id))
        }
    }, [sessionUser])
  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
    <Switch>
        <Route exact path = '/'>
            <SplashPage />
        </Route>
        <>
      <NavBar />
      <Switch>
        <Route path = '/home' exact = {true}>
            <Home />
        </Route>
        <Route path = '/users/:username' >
            <Profile />
        </Route>
        {/* <Route path = '/notifications' >
        <NotificationPage />
        </Route> */}
        <Route path ='/hearts/:heartId'>
            <HeartPage />
        </Route>
        <Route >
            <PageNotFound />
        </Route>
      </Switch>
        {showAlert&& <Alert/>}
      {!sessionUser &&<AuthReminder />}
      <SideBar />
        </>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
