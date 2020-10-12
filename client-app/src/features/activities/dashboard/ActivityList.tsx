import React, { Fragment, useContext } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem'
import {RootStoreContext} from '../../../app/store/rootStore'

const ActivityList: React.FC = () => {
  const rootyStore = useContext(RootStoreContext);
  const {activitiesByDate} = rootyStore.activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group} >
          <Label size='large' color='green'>
            {group}
          </Label>
            <Item.Group divided>
              {activities.map(activity => (
                <ActivityListItem key={activity.id} activity={activity}/>
              ))}
            </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityList);
