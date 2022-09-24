import React from 'react';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../../components/Column'

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

  onDragEnd = ( result ) => {
    const {
      destination,  //  destination droppable column and target index
      source,       //  source droppable column and index
      draggableId,  //  id of draggable task
    } = result;

    if(!destination
      || ( destination.droppableId === source.droppableId
        && destination.index === source.index )
    ) {
      return;
    }

    const start  = this.state.columns[source.droppableId];        //  copy source column
    const finish = this.state.columns[destination.droppableId];   //  copy destination column

    const startTaskIds = Array.from(start.taskIds);               //  from source list
    startTaskIds.splice(source.index, 1);                         //  remove element's index what moving


    if(start === finish) {
      startTaskIds.splice(destination.index,0, draggableId);      //  insert it the new position

      const newColumn = {
        ...start,
        taskIds: startTaskIds,
      };    //  create a new 'column' object from source 'column' with ordered task list

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };    //  create a new 'state' object from existing values,
            //  but override this.state.columns[destination.droppableId] with reordered new column

      this.setState(newState);
    } else {

      const finishTaskIds = Array.from(finish.taskIds);           //  from destination list
      finishTaskIds.splice(destination.index, 0, draggableId);    //  insert it the new position of target column

      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };    //  create a new 'column' object from source 'column' without moved task

      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };    //  create a new 'column' object from destination 'column' with the moved task in an appropriate position

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };    //  create a new 'state' object from existing values,
            //  but override this.state.columns[destination.droppableId] with reordered new column
      this.setState(newState);
    }


  }

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
              {this.state.columnOrder.map((columnId) => {
                const column = this.state.columns[columnId];
                const tasks = column.taskIds.map(taskId =>this.state.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks} allUsers={this.state.users} />;
              })}
            </Container>
          </DragDropContext>
        </div>
      </>
    );
  }
}

export default Board;