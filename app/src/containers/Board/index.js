import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';

const Container = styled.div`
  display: flex;
`;

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: {},
      usersUpdated: false,
      tasks: {},
      columns: {},
      columnOrder: [],
      boardUpdated: false,
    };
  }

  componentDidUpdate = () => {
    //  prevents infinite calls
    if(!this.state.usersUpdated) {
      //  upload state.users from props.users {key=user.id => value=user.name }
      let users = {};

      for (const user of this.props.users) {
        users[user.id] = user.name;
      }

      this.setState(() => ({
        users: users,
        usersUpdated: true,
      }));
    }

    if(!this.state.boardUpdated) {
      //  upload state.users from props.users {key=user.id => value=user.name }
      let tasks = {};
      let columns = {};
      let columnOrder = [];

      for (const column of this.props.boardColumns) {
        columns[column.id] = {
          id: column.id,
          title: column.name,
          taskIds: [],
        };
        columnOrder.push(column.id);
        for (const task of column.tasks) {
          if( !columns[column.id].taskIds.includes(task.id) ) {
            columns[column.id].taskIds.push(task.id);
          }

          if (!(task.id in tasks)) {
            tasks[task.id] = task;
          }
        }
      }

      this.setState(() => ({
        tasks: tasks,
        columns: columns,
        columnOrder: columnOrder,
        boardUpdated: true,
      }));
    }
  };


  render () {

    if (typeof this.props.boardColumns === 'undefined' || typeof this.props.users === 'undefined')
      return;

    return (
      <>
        <div className="main-board">
          <DragDropContext
            onDragEnd = {this.onDragEnd}
          >
            <Container>
              <h1>Board</h1>
            </Container>
          </DragDropContext>
        </div>
      </>
    );
  }
}

export default Board;