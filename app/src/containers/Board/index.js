import React from 'react';

class Board extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      usersUpdated: false,
    };
  }

  componentDidUpdate() {
    //  upload state.users from props.users {key=user.id => value=user.name }
    let users = {};
    for (const user of this.props.users) {
      users[user.id] = user.name;
    }
    //  prevents infinite calls
    if(!this.state.usersUpdated) {
      this.setState(() => ({
        users: users,
        usersUpdated: true,
      }));
    }
  }


  render () {

    if (typeof this.props.boardColumns === 'undefined' || typeof this.props.users === 'undefined')
      return;

    console.log([this.props.boardColumns, this.props.users]);


    return (
      <>
        <div className="main-board">
          <div className="row">
            <h1>Board</h1>
          </div>
        </div>
      </>
    );
  }
};

export default Board;