import React from "react";

export default class Users extends React.Component {

  renderUser(userId) {
    return (
      <b key={userId}>
        {this.props.allUsers[userId]}&nbsp;
      </b>
    );
  }

  render () {
    const userList = [];
    this.props.users.map((userId,i) => {
      userList[i] = this.renderUser(userId);
    });
    return (
      <>
        {userList}
      </>
    );
  }
};
