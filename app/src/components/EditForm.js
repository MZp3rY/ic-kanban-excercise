import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';

export default class EditForm extends React.Component {
  render () {
    const task = this.props.task;
    console.log(task.assigned.indexOf('256de3b2-ca7d-427a-b890-aa3176707df0'));
    return (
      <Form>
        <Form.Group className="form-task-name mb-3" controlId="formTaskName">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            type="text"
            name="taskName"
            defaultValue={task.name}
            placeholder="Enter a name to task" />
        </Form.Group>

        <Form.Group className="form-task-importance mb-3" controlId="formTaskImportance">
          <Form.Label>Importance</Form.Label>
          <ul>
            {[0,1,2].map(v =>
              <li key={"formTaskImportance-" + v}>
                <Form.Check
                  type="radio"
                  defaultChecked={task.importance === v}
                  label={v}
                  id={"formTaskImportance-" + v}
                  name="importance" />
              </li>
            )}
          </ul>
        </Form.Group>

        <Form.Group className="form-task-description mb-3" controlId="formTaskDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="taskDescription"
            defaultValue={task.description}
            placeholder="Type some description to the task" />
        </Form.Group>

        <Form.Group className="form-task-assigned mb-3" controlId="formTaskAssigned">
          <Form.Label>Assigned to</Form.Label>
          <ul>
          {this.props.users.map( (user) =>
            <li key={task.id + '_' + user.id}>
              <Form.Check
                type="checkbox"
                label={user.name}
                id={"formTaskAssigned-" + user.id}
                defaultValue={user.id}
                defaultChecked={task.assigned.indexOf(user.id) >= 0}
                name="assigned" />
            </li>
          )}
          </ul>
        </Form.Group>

      </Form>
    );
  }
}