import React from "react";
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export default class Users extends React.Component {

  render () {
    return (
      <div className="assigned-users">
        {this.props.assigned.map( (userId, i) =>
          <OverlayTrigger
            key={userId + '_' + i}
            placement="bottom"
            overlay={<Tooltip id={'user_' + userId + '_' + i}>{this.props.users[this.props.users.findIndex(item => item.id === userId)].name}</Tooltip>}
          >
            <b className="bi bi-person-fill">
              <span>
                {this.props.users[this.props.users.findIndex(item => item.id === userId)].name}
              </span>
            </b>
          </OverlayTrigger>
        )}
      </div>
    );
  }
}
