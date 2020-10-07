import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react'
import ActivityStore from '../../app/store/activityStore';

const Navbar: React.FC = () => {
    const activityStore = useContext(ActivityStore);
    return (
            <Menu fixed = 'top' inverted >
                <Container>
                    <Menu.Item header as={NavLink} exact to='/'>
                        <img src="/assets/logo.png" alt ="logo" style = {{marginRight: '25px'}}/>
                        Reactivities
                    </Menu.Item>
                    <Menu.Item name='Activities' as={NavLink} to='/activities'/>
                    <Menu.Item>
                        <Button as={NavLink} to='/createActivity' positive content='Create Activity'/>
                    </Menu.Item>
                </Container>
            </Menu>
    )
}

export default observer(Navbar);
