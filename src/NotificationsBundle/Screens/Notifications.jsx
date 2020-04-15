import React from 'react'
//style
import style from './notifications.module.css';
//Utils/Constants
import { NotificationsConstants } from '../Constants/NotificationsConstants'
//react router dom
import { BrowserRouter, Route, Switch } from 'react-router-dom';
//Components
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle'
import { NotificationsMenu } from '../Components/NotificationsMenu/NotificationsMenu'
import { NotificationsItems } from '../Components/NotificationsItems/NotificationsItems';
import { NotificationItem } from '../Components/NotificationsItems/NotificationItem';

export const Notifications = () => {
  return (
    <div className={style.notifications}>
      <PageTitle name={NotificationsConstants.PAGE_TITLE} hasBackButton={true} />
      <div className={style.notificationsBorderSide}>
        <BrowserRouter>
          <NotificationsMenu />
          <Switch>
            <Route path='/dashboard/notifications' component={NotificationsItems} exact />
            <Route path='/dashboard/notifications/mentions' component={NotificationItem} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  )
}
