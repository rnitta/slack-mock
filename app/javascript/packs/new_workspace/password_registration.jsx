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
  update_state(e) {
    e.preventDefault()
    // Parentのステートを更新
    this.props.update_password({password: this.state.password})
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
      <form id="password_form" style={{visibility: this.props.style}}>
        <h1>パスワードを設定する</h1>
        <p>サインインするためのパスワードを選択してください。６文字以上。</p>
        <input type="password" id="password_input" className="biginput" onChange={(e) => this.validate_password(e)}/>
        <button id="submit_password" disabled={this.state.isdisabled} onClick={this.update_state.bind(this)}>ワークスペース情報に進む</button>
      </form>
    );
  }
}
