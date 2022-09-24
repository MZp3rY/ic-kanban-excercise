import React from "react";
import styled from 'styled-components';
import Users from "./Users";

import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  box-shadow: ${props => (props.isDragging ? '10px 10px 10px #00000055' : 'unset')};
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
              <i className='handler bi bi-arrows-move' />
            </div>

            <div className='flex-break' />

            <div className='task-description'>
              {this.props.task.description}
            </div>

            <div className='task-footer'>
              <Users className='user-list'
                     users={this.props.task.assigned}
                     allUsers={this.props.allUsers}
              />

            </div>
          </Container>
        )}
      </Draggable>

    );
  }
}