import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import packageJson from '../package.json';
import { authenticate } from './store/session';
import AuthReminder from './components/Nav/AuthReminder';
import Home from './Home/Home';
import Profile from './components/Profile/Profile.js';
import HeartPage from './components/Hearts/HeartPage';
import Alert from './components/Alert/Alert';
import { useAlert } from './context/Alert';
import SideBar from './components/Sidebar/SideBar';
import SplashPage from './components/SplashPage/SplashPage';
function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const {showAlert} = useAlert()
   const sessionUser = useSelector(state => state.session.user)
   console.log(packageJson.proxy, 'hi from heroku')

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

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
        <Route path ='/hearts/:heartId'>
            <HeartPage />
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
