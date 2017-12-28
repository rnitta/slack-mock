import React from 'react'
import axios from 'axios'

export default class DmHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps(obj) {}
  render() {
    var status_mark = []
    if (this.props.grandparentstate.selected_user.status == 1) {
      status_mark.push(
        <div className="user_status" key="status_active">
          <i className="active_user_mark">●</i>
          <span className="status_message">アクティブ</span>
        </div>
      )
    } else {
      status_mark.push(
        <div className="user_status" key="status_inactive">
          <i className="inactive_user_mark">○</i>
          <span className="status_message">退席中</span>
        </div>
      )
    }
  return (
    <div id="dm_header_container">
      <div className="header_left">
        <span className="user_name_span">{this.props.grandparentstate.selected_user.display_name}</span>
        <div className="dm_header_info">
          {status_mark}
          <span className="user_name">{this.props.grandparentstate.selected_user.user_name}</span>
        </div>
      </div>
    </div>
  );
}
}
