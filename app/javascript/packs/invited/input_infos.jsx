import React from 'react'
import axios from 'axios'

export default class InputInfos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isdisabled: true
    }
  }
  oninput() {
    let user_name = this.refs.user_name_input.value
    let display_name = this.refs.display_name_input.value
    let password = this.refs.password_input.value
    var flags = []
    flags[0] = user_name.length > 2
    flags[1] = user_name.length < 51
    flags[2] = display_name.length < 51
    flags[3] = password.length > 5
    if (flags.indexOf(false) === -1) {
      this.setState({isdisabled: false})
    } else {
      this.setState({isdisabled: true})
    }
  }
  submit() {}
  render() {
    return (
      <div id="input_infos">
        <h1>ユーザー情報</h1>
        <div className="input_group">
          <label>ユーザー名*</label>
          <input type="text" className="large_input" ref="user_name_input" onInput={this.oninput.bind(this)}/>
        </div>
        <div className="input_group">
          <label>表示名(optional)</label>
          <input type="text" className="large_input" ref="display_name_input" onInput={this.oninput.bind(this)}/>
        </div>
        <h1>ログイン情報</h1>
        <div className="input_group">
          <label>メールアドレス</label>
          <span className="email_span">{this.props.state.email}</span>
        </div>
        <div className="input_group">
          <label>パスワード(6文字以上)*</label>
          <input type="password" className="large_input" ref="password_input" onInput={this.oninput.bind(this)}/>
        </div>
        <button className="large_btn" disabled={this.state.isdisabled} onClick={this.submit.bind(this)}>登録</button>
      </div>
    );
  }
}
