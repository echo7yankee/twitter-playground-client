import React, { useEffect } from 'react'
import jwt from 'jsonwebtoken';

//react router dom 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';

//redux
import { useDispatch } from 'react-redux'
import { getUserDetails } from './Redux/actions/user/user';

//components
import { Register } from './AuthBundle/Components/Register'
import { Login } from './AuthBundle/Components/Login'
import { Home } from './HomeBundle/Screens/Home'
import { Navbar } from './GlobalComponents/Navbar/Navbar'
import { Dashboard } from './Dashboard/Dashboard'
import { Profile } from './ProfileBundle/Screens/Profile.jsx';


export const App = () => {

  const dispatch = useDispatch();

  //token
  const token = localStorage.FBIdToken;
  let userId;
  if (token) {
    userId = jwt.decode(token).params.id;
  }

  useEffect(() => {
    dispatch(getUserDetails(userId));
  }, [dispatch, userId]);

  return (
    <BrowserRouter>
      <LastLocationProvider>
        <Navbar />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </LastLocationProvider>
    </BrowserRouter>
  )
}
