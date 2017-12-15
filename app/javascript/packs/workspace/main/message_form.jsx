import React from 'react'

export default class MessageForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isdisabled: false
    }
  }
  render() {
    return (
      <form className="message_form">
        <div className="editable_div" contentEditable="true"></div>
        <button className="submit_btn" disabled={this.state.isdisabled}>送信</button>
      </form>
    );

  }
}
