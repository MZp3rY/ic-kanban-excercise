import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';
import EditForm from "./EditForm";

export default class PopupModal extends React.Component {

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
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={(e,n) => this.props.handleSave(e,this.props.task.id)}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      );
  }
}