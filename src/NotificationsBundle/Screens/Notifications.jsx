import React from 'react'
//style
import style from './notifications.module.css';
//Utils/Constants
import { NotificationsConstants } from '../Constants/NotificationsConstants'
//react router dom
import { Route, Switch } from 'react-router-dom';
//Components
import { PageTitle } from '../../GlobalComponents/PageTitle/PageTitle'
import { NotificationsMenu } from '../Components/NotificationsMenu/NotificationsMenu'
import { NotificationsItems } from '../Components/NotificationsItems/NotificationsItems';

export const Notifications = () => {
  //TODO: THINK ABOUT MENTIONS, HOW TO ADD NAME TAGS IN POSTS TO REFLECT THE MENTIONS
  //TODO: CLOSE ON EMOJI SELECT AND REPAIR EMOJIS PLACING UNDER TEXT/ CLOSE EMOJI WHEN CLICKING OUTSIDE
  //TODO: CROP PICTURE
  return (
    <div className={style.notifications}>
      <PageTitle name={NotificationsConstants.PAGE_TITLE} hasBackButton={true} />
      <div className={style.notificationsBorderSide}>
        <NotificationsMenu />
        <Switch>
          <Route path='/dashboard/notifications' component={NotificationsItems} />
          <Route path='/dashboard/notifications/mentions' component={NotificationsItems} />
        </Switch>
      </div>
    </div>
  )
}
