import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import ActivityStore from '../../../app/store/activityStore';
import ActivityDetailInfo from './ActivityDetailInfo';
import ActivityDetailChat from './ActivityDetailChat';
import ActivityDetailHeader from './ActivityDetailHeader';
import ActivityDetailSideBar from './ActivityDetailSidebar';

interface DetailParams {
    id: string;
}

const ActivitiesDetails: React.FC<RouteComponentProps<DetailParams>> = ({match, history}) => {
    const activityStore = useContext(ActivityStore);
    const {activity, loadingInitial, loadActivity} = activityStore;
    
    useEffect(() => {
        loadActivity(match.params.id);
    },[loadActivity, match.params.id, history])

    if(loadingInitial) return <LoadingComponent content='Loading activity...'/>

    if(!activity)
        return <h1>Activity not found</h1>

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailHeader activity={activity}/>
                <ActivityDetailInfo activity={activity}/>
                <ActivityDetailChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailSideBar/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivitiesDetails);
