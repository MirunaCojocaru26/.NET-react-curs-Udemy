import React, {Fragment, useContext, useEffect} from 'react';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import NavBar from '../../features/nav/NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, RouteComponentProps, Switch, withRouter} from 'react-router-dom';
import HomePage from '../../features/home/HomePage'
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import LoginForm from '../../features/user/LoginForm'
import NotFound from './NotFound';
import {ToastContainer} from 'react-toastify'
import { RootStoreContext } from '../store/rootStore';
import LoadingComponent from './LoadingComponent';
import ModelContainer from '../common/models/ModelContainer'

const App: React.FC<RouteComponentProps> = ({location}) => {
    const rootStore = useContext(RootStoreContext);
    const {setAppLoaded, token, appLoades} = rootStore.commonStore;
    const {getUser} = rootStore.userStore;

    useEffect(() => {
      if(token){
        getUser().finally(() => setAppLoaded());
      } else {
        setAppLoaded();
      }
    },[getUser, setAppLoaded, token])

    if(!appLoades) return <LoadingComponent content="Loading app..." />

    return (
      <Fragment >
        <ModelContainer/>
        <ToastContainer position='bottom-right'/>
        <Route exact path='/' component={HomePage} /> 
        <Route path={'/(.+)'} render ={() => (
          <Fragment>
          <NavBar />
          <Container style={{marginTop: '7em'}}>
            <Switch>
            <Route exact path='/activities' component={ActivityDashboard} /> 
            <Route path='/activities/:id' component={ActivityDetails} /> 
            <Route key={location.key} path={['/createActivity', '/manage/:id']} component={ActivityForm} /> 
            <Route path='/login' component={LoginForm} />
            <Route component={NotFound}/>
            </Switch>      
          </Container>
          </Fragment>
        )}/>
      </Fragment>
    );

}

export default withRouter(observer(App));