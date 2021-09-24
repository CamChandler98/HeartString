import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/Nav/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';

import { authenticate } from './store/session';
import AuthReminder from './components/Nav/AuthReminder';
import Home from './Home/Home';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

   const sessionUser = useSelector(state => state.session.user)

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
      <NavBar />
      <Switch>
        <Route path = '/home' exact = {true}>
            <Home />
        </Route>
      </Switch>
      
      {!sessionUser &&<AuthReminder />}
    </BrowserRouter>
  );
}

export default App;
