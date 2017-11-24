import React from 'react'

export default class Registration extends React.Component {
  constructor() {
    super()
    // stateの初期値を設定
    this.state = {
      isdisabled: true
    }
  }
  validate_email(e) {
    // メールアドレスが有効か検証
    let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ //要検証
    if (regex.test(e.target.value)) {
      this.setState({isdisabled: false})
    }
  }
  render() {
    return (
      <form id="email_form">
        <input type="email" placeholder="your@adress.here" id="email_input" onChange={(e) => this.validate_email(e)}/>
        <button id="submit_btn" disabled={this.state.isdisabled}>Enter</button>
      </form>
    );
  }
}
