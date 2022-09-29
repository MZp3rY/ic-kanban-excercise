import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form} from 'react-bootstrap';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.task.name,
      taskImportance: this.props.task.importance,
      taskDescription: this.props.task.description,
      taskAssigned: this.props.task.assigned,
    }
  }

  importanceOnChange = (e) => {
    this.setState({
      taskImportance: parseInt(e.currentTarget.value),
    });
    this.props.setImportance( parseInt(e.currentTarget.value) );
  }

  assignedOnChange = (e) => {
    let v = e.currentTarget.value;
    let newAssignedArr = Array.from(this.state.taskAssigned);

    if(e.currentTarget.checked && newAssignedArr.indexOf( v ) === -1)
      newAssignedArr.push( v );

    if(!e.currentTarget.checked && newAssignedArr.indexOf( v ) !== -1)
      newAssignedArr.splice(newAssignedArr.indexOf( v ), 1);

    this.setState({ taskAssigned: newAssignedArr });
    this.props.setAssigned(newAssignedArr);
  }

  render () {
    const task = this.props.task;

    return (
      <Form>
        <Form.Group className="form-task-name mb-3" controlId="formTaskName">
          <Form.Label>Task name</Form.Label>
          <Form.Control
            type="text"
            name="taskName"
            value={this.state.taskName}
            onChange={event => {
                this.setState({taskName: event.target.value});
                this.props.setName(event.target.value);
              }
            }
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
                  value={v}
                  onChange={this.importanceOnChange}
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
            value={this.state.taskDescription}
            onChange={event => {
                this.setState({taskDescription: event.target.value});
                this.props.setDescription(event.target.value);
              }
            }
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
                value={user.id}
                onChange={this.assignedOnChange}
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