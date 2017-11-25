import React from 'react'

export default class PasswordRegistration extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      isdisabled: true,
      password: ""
    }
  }
  updateState(e) {
    e.preventDefault()
    // Parentのステートを更新
    this.props.updatePassword({password: this.state.password})
  }
  validate_password(e) {
    // パスワードが有効か検証
    if (e.target.value.length > 5) {
      this.setState({isdisabled: false, password: e.target.value})
    }else{
      this.setState({isdisabled: true})
    }
  }
  render() {
    return (
      <form id="password_form" style={this.props.style}>
        <input type="password" id="password_input" onChange={(e) => this.validate_password(e)}/>
        <button id="submit_btn" disabled={this.state.isdisabled} onClick={this.updateState.bind(this)}>Enter</button>
      </form>
    );
  }
}
