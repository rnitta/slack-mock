import React from 'react'

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isdisabled: false
    }
  }
  send(e) {
    e.preventDefault()
    let msg = this.refs.send_div.innerText
    if (msg == "") {
      return false
    }
    this.refs.send_div.innerText = ""
    var obj = new Object()
    obj.message = msg
    obj.type = this.props.grandparentstate.selected
    if (obj.type == "user") {
      obj.to = this.props.grandparentstate.selected_user.user_name
    } else if (obj.type == "channel") {
      obj.to = this.props.grandparentstate.selected_channel.name
    }

    window.chat.perform('broadcast_message', {
      type: obj.type,
      to: obj.to,
      message: obj.message
    })
  }
  render() {
    return (
      <form className="message_form">
        <div className="editable_div" contentEditable="true" ref="send_div"></div>
        <button className="submit_btn" disabled={this.state.isdisabled} onClick={this.send.bind(this)}>送信</button>
      </form>
    );

  }
}
