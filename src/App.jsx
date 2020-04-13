import React from 'react'

//react router dom 
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { LastLocationProvider } from 'react-router-last-location';


//components
import { Register } from './AuthBundle/Components/Register'
import { Login } from './AuthBundle/Components/Login'
import { Home } from './HomeBundle/Screens/Home'
import { Navbar } from './GlobalComponents/Navbar/Navbar'
import { Dashboard } from './Dashboard/Dashboard'


export const App = () => {

  return (
    <BrowserRouter>
      <LastLocationProvider>
        <Navbar />
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
        </Switch>
      </LastLocationProvider>
    </BrowserRouter>
  )
}
