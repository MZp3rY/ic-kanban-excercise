import React from "react";
import styled from 'styled-components';
import Users from "./Users";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  box-shadow: ${props => (props.isDragging ? '5px 5px 15px #00000055' : 'unset')};
`;

export default class Task extends React.Component {
  render () {
    return (

      <Draggable
        draggableId={this.props.task.id}
        index={this.props.index}
      >
        {(provided,snapshot) => (
          <Container
            className={'task importance-' + this.props.task.importance}
            {...provided.draggableProps}

            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >

            <div className='task-title'
                 {...provided.dragHandleProps}
            >
              <h3>{this.props.task.name}</h3>
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip id="button-tooltip-2">Draggable, move it!</Tooltip>}
              >
                <i className='handler bi bi-arrows-move' />
              </OverlayTrigger>
            </div>

            <div className='flex-break' />

            <div className='task-description'>
              {this.props.task.description}
            </div>

            <div className='task-footer'>
              <Users className='user-list'
                     assigned={this.props.task.assigned}
                     users={this.props.users}
              />
              <div className="control-icons">
                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Delete task</Tooltip>}
                >
                  <i className='delete-button bi bi-trash-fill'
                     onClick={() =>this.props.showConfirmDelete(this.props.task.id)}
                  />
                </OverlayTrigger>

                <OverlayTrigger
                  placement="bottom"
                  overlay={<Tooltip id="button-tooltip-2">Edit task</Tooltip>}
                >
                  <i className='edit-button bi bi-pencil-square'
                     onClick={() =>this.props.openEditModal(this.props.task)}
                  />
                </OverlayTrigger>
              </div>
            </div>
          </Container>
        )}
      </Draggable>

    );
  }
}