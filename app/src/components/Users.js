import React from "react";

export default class Users extends React.Component {

  render () {
    return (
      <div className="assigned-users">
        <i className="bi bi-people-fill" />
        {this.props.assigned.map( (userId, i) =>
          <b key={userId + '_' + i}>
            {this.props.users[this.props.users.findIndex(item => item.id === userId)].name}
          </b>
        )}
      </div>
    );
  }
}
