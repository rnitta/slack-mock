import React from 'react'

export default class Message extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    function datetime(str){
      return `${str.substr(0,4)}年 ${str.substr(5,2)}月 ${str.substr(8,2)}日 ${str.substr(11,8)}`
    }
    var message = this.props.message
    var users = this.props.rootstate.users
    var user = users.filter((item) => {if (item.id == this.props.message.sender_id) return true})[0]
    var name_init = user.display_name.slice(0, 1)
    return (
      <div className="message_container">
        <div className="message_icon">
          <div className="icon_mock">{name_init}</div>
        </div>
        <div className="message_content">
          <div className="message_header">
            <div className="message_display_name">{user.display_name}</div>
            <div className="message_datetime">{datetime(message.created_at)}</div>
          </div>
          <div className="message_text">
            {message.message}
          </div>
        </div>
      </div>
    )

  }
}
