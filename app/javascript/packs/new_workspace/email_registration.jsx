import React from 'react'

export default class EmailRegistration extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      isdisabled: true,
      email: ""
    }
  }
  updateState(e) {
    e.preventDefault()
    // Parentのステートを更新
    this.props.updateEmail({email: this.state.email})
  }
  validate_email(e) {
    // メールアドレスが有効か検証
    let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ //要検証
    if (regex.test(e.target.value)) {
      this.setState({isdisabled: false, email: e.target.value})
    }
  }
  render() {
    return (
      <form id="email_form" style={this.props.style}>
        <input type="email" placeholder="your@adress.here" id="email_input" onChange={(e) => this.validate_email(e)}/>
        <button id="submit_btn" disabled={this.state.isdisabled} onClick={this.updateState.bind(this)}>Enter</button>
      </form>
    );
  }
}
