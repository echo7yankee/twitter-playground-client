import React from 'react';

//redux
import { useSelector } from 'react-redux';

//react router dom
import { Route, Switch, Redirect } from 'react-router-dom';
import { LastLocationProvider } from 'react-router-last-location';

//components
import { DashboardHome } from './DashboardHome/DashboardHome';
import { SideMenu } from './SideMenu/SideMenu';
import { Trends } from '../TrendsBundle/Screens/Trends';
import { Profile } from '../ProfileBundle/Screens/Profile';
import { Notifications } from '../NotificationsBundle/Screens/Notifications';
import { SingleTweet } from '../TweetsBundle/Components/SingleTweet/SingleTweet';
import { Messages } from '../MessagesBundle/Screens/Messages';

export const Dashboard = ({ history }) => {
  //redux
  const authenticated = useSelector(state => state.auth.authenticated);

  if (!authenticated) { return <Redirect to='/' /> }

  return <div>
    <LastLocationProvider>
      <div className="dashboard">
        <div className="container-large">
          <div className='container-column-small'>
            <SideMenu />
          </div>
          <div className="container-column-large">
            <Switch>
              <Route path='/dashboard' component={DashboardHome} exact />
              <Route path='/dashboard/notifications' component={Notifications} />
              <Route path='/dashboard/messages' component={Messages} />
              <Route path='/dashboard/profile' component={Profile} exact />
              <Route path='/dashboard/user/:name' component={Profile} exact />
              <Route path='/dashboard/status/:postId' component={SingleTweet} />
            </Switch>
          </div>
          {!history.location.pathname.includes('/dashboard/messages')
            ? <div className='container-column-medium mt-05'>
              <Trends />
            </div>
            : null
          }
        </div>
      </div>
    </LastLocationProvider>
  </div>
}
