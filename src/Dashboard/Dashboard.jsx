import React from 'react';

//redux
import { useSelector } from 'react-redux';

//react router dom
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

//components
import { DashboardHome } from './DashboardHome/DashboardHome';
import { Menu } from './Menu/Menu';
import { Trends } from './Trends/Trends';
import { Profile } from '../ProfileBundle/Screens/Profile';

export const Dashboard = () => {

  // * TODO:
  // * STYLE MENU AS TWITTER

  //redux
  const authenticated = useSelector(state => state.auth.authenticated);

  if (!authenticated) { return <Redirect to='/' /> }

  return <div>
    <BrowserRouter>
      <div className="dashboard">
        <div className="container-large">
          <div className='container-column-small'>
            <Menu />
          </div>
          <div className="container-column-large">
            <Switch>
              <Route path='/dashboard/' component={DashboardHome} exact />
              <Route path='/dashboard/profile' component={Profile} />
            </Switch>
          </div>
          <div className='container-column-medium'>
            <Trends />
          </div>
        </div>
      </div>
    </BrowserRouter>
  </div>
}
