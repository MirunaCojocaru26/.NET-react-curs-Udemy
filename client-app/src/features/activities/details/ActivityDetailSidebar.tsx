import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Item, Label, List, Segment, Image } from 'semantic-ui-react';
import { IAttendee } from '../../../app/models/activity';

interface IProps{
  attendees: IAttendee[];
}

const ActivityDetailSidebar: React.FC<IProps> = ({attendees}) => {
    return (
            <Fragment>
              <Segment
                textAlign='center'
                style={{ border: 'none' }}
                attached='top'
                secondary
                inverted
                color='teal'
              >
                {attendees.length} {attendees.length === 1 ? 'Person': 'People'}
              </Segment>
              <Segment attached>
                <List relaxed divided>
                  {attendees.map((attendees) => (
                    <Item key={attendees.username} style={{ position: 'relative' }}>
                      {attendees.isHost &&
                      <Label
                        style={{ position: 'absolute' }}
                        color='orange'
                        ribbon='right'
                      >
                        Host
                      </Label>}
                      <Image size='tiny' src={attendees.image || '/assets/user.png'} />
                      <Item.Content verticalAlign='middle'>
                        <Item.Header as='h3'>
                          <Link to={`/profile/${attendees.username}`}>{attendees.displayName}</Link>
                        </Item.Header>
                        {attendees.following && 
                        <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>}
                      </Item.Content>
                    </Item>
                  ))}
                </List>
              </Segment>
            </Fragment>
    )
}

export default observer( ActivityDetailSidebar);
