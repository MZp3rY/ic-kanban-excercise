import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Modal,Button} from 'react-bootstrap';

export default class ConfirmationModal extends React.Component {

  render () {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={() => this.props.confirmedDelete(this.props.taskId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};
