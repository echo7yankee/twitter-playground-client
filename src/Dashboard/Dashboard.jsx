import React from 'react';

//redux
import { useSelector } from 'react-redux';

//react router dom
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

//components
import { DashboardHome } from './DashboardHome/DashboardHome';
import { SideMenu } from './SideMenu/SideMenu';
import { Trends } from '../TrendsBundle/Screens/Trends';
import { Profile } from '../ProfileBundle/Screens/Profile';
import { Notifications } from '../NotificationsBundle/Screens/Notifications';

export const Dashboard = () => {
  //redux
  const authenticated = useSelector(state => state.auth.authenticated);

  if (!authenticated) { return <Redirect to='/' /> }

  return <div>
    <BrowserRouter>
      <LastLocationProvider>
        <div className="dashboard">
          <div className="container-large">
            <div className='container-column-small'>
              <SideMenu />
            </div>
            <div className="container-column-large">
              <Switch>
                <Route path='/dashboard/' component={DashboardHome} exact />
                <Route path='/dashboard/notifications' component={Notifications} />
                <Route path='/dashboard/profile' component={Profile} />
                <Route path='/dashboard/:id' component={Profile} />
              </Switch>
            </div>
            <div className='container-column-medium mt-05'>
              <Trends />
            </div>
          </div>
        </div>
      </LastLocationProvider>
    </BrowserRouter>
  </div>
}
