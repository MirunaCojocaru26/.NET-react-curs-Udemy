import React, { useContext, useEffect, useState} from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/activity';
import { observer } from 'mobx-react-lite';
import { v4 as uuid } from 'uuid';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form';
import TextInput from '../../../app/common/form/TextInput';
import TextAreaInput from '../../../app/common/form/TextAreaInput';
import SelectItem from '../../../app/common/form/SelectInput';
import DataInput from '../../../app/common/form/DataInput';
import {category} from '../../../app/common/options/categoryOptions';
import {combineDateAndTime} from '../../../app/common/util/util';
import { combineValidators, isRequired, composeValidators, hasLengthGreaterThan} from 'revalidate';
import {RootStoreContext} from '../../../app/store/rootStore'

const validate = combineValidators({
  title: isRequired({ message: 'The event title is required' }),
  category: isRequired('Category'),
  description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(4)({
      message: 'Description needs to be at least 5 characters'
    })
  )(),
  city: isRequired('City'),
  venue: isRequired('Venue'),
  date: isRequired('Date'),
  time: isRequired('Time')
});

interface DetailParam {
  id: string;
}

const ActivityForm: React.FC<RouteComponentProps<DetailParam>> = ({match, history}) => {

  const rootStore = useContext(RootStoreContext);
  const {createActivity, loadActivity, editActivity, submitting} = rootStore.activityStore;

    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading] = useState(false);

  useEffect(() => {
    if(match.params.id ) {
      loadActivity(match.params.id).then((activity) => setActivity(new ActivityFormValues(activity)));
    }
  },[loadActivity, match.params.id])

    const handleFinalFormSubmit = (values: any) => {
      const dateAndTime = combineDateAndTime(values.date, values.time);
      const{date, time, ...activity} = values;
      activity.date= dateAndTime;

      if (!activity.id) {
        let newActivity = {
          ...activity,
          id: uuid()
        };
        createActivity(newActivity);
      } else {
        editActivity(activity);
      }
    }

    return (
      <Grid>
        <Grid.Column width={10}>
          <Segment clearing>
            <FinalForm validate={validate} initialValues={activity} onSubmit ={handleFinalFormSubmit} render={({handleSubmit, invalid, pristine}) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                  <Field name='title' placeholder = 'Title' value = {activity.title} component={TextInput} />
                  <Field name='description' placeholder = 'Description' rows={3} value = {activity.description} component={TextAreaInput} />
                  <Field name='category' options={category} placeholder = 'Category' value = {activity.category} component={SelectItem} />
                  <Form.Group widths='equal'>
                  <Field name='date' date={true} placeholder = 'Date' value = {activity.date} component={ DataInput} />
                  <Field name='time' time={true} placeholder = 'Time' value = {activity.time} component={ DataInput} />
                  </Form.Group>
                  <Field name='city' placeholder = 'City' value = {activity.city} component={TextInput} />
                  <Field name='venue' placeholder = 'Venue' value = {activity.venue} component={TextInput} />
                  <Button loading={submitting} disabled={loading || invalid || pristine} floated='right' positive type='submit' content = 'Submit'/>
                  <Button onClick={activity.id ? () => history.push(`/activities/${activity.id}`): () => history.push('/activities')} floated='right' type='button' content = 'Cancel'/>
              </Form>
            )} />
          </Segment>
        </Grid.Column>
      </Grid>
    )
}

export default observer(ActivityForm);
