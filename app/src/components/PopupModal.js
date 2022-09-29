import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';
import EditForm from "./EditForm";

export default class PopupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.task.name,
      taskDescription: this.props.task.description,
      taskImportance: this.props.task.importance,
      taskAssigned: this.props.task.assigned,
    }
  };

  render () {
      return (
        <Modal show={true} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit task</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm
              task={this.props.task}
              users={this.props.users}
              setName={(value) => this.setState({taskName: value})}
              setDescription={(value) => this.setState({taskDescription: value})}
              setImportance={(value) => this.setState({taskImportance: value})}
              setAssigned={(value) => this.setState({taskAssigned: value})}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e,n) => {

                const obj = {
                  id: this.props.task.id,
                  name: this.state.taskName,
                  assigned: this.state.taskAssigned,
                  importance: this.state.taskImportance,
                  description: this.state.taskDescription,
                };
                this.props.handleSave(e, obj);
              }
            }>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      );
  }
}