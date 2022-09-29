import React from 'react';
import styled from 'styled-components';
import { Droppable } from "react-beautiful-dnd";
import Task from './Task';

const Title = styled.h3`
  padding: 10px;
`;
const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? 'white' : '#f0f0f0')};
  box-shadow: ${props => (props.isDraggingOver ? '0 0 5px white' : 'none')};
`;

export default class Column extends React.Component {
  render() {
    return (
      <div
        key={this.props.column.id}
        className='column'
      >
        <Title className='column-title'>{this.props.column.title}</Title>
        <Droppable
          droppableId={this.props.column.id}
        >
          {(provided,snapshot) => (
            <TaskList
              className='task-list'
              {...provided.droppableProps}
              ref={provided.innerRef}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task,index) =>
                <Task
                  key={task.id}
                  task={task}
                  index={index}
                  users={this.props.users}
                  openEditModal={this.props.openEditModal}
                  showConfirmDelete={this.props.showConfirmDelete}
                />)}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </div>
    );
  }
}