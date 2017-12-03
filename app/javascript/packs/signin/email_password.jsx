import React from 'react'
import axios from 'axios'

export default class EmailPassword extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      isdisabled: false,
      error_style: {
        display: "none"
      }
    }
  }

  signin() {
    let input_email = this.refs.email.value
    let input_password = this.refs.password.value
    this.setState({
      isdisabled: true,
      error_style: {
        display: "none"
      }
    })
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.csrf_token
    axios.post('/signin', {
      signin: {
        domain: this.props.parentstate.domain,
        email: input_email,
        password: input_password
      }
    }).then((results) => {
      if (results.data.success) {
        // Parentのステートを更新
        this.props.update_email_password({email: input_email, password: input_password})
      } else {
        this.setState({isdisabled: false})
        this.setState({
          error_style: {
            display: "block"
          }
        })

      }
    },).catch(() => {
      alert('エラー')
      this.setState({isdisabled: false})
    });
  }

  render() {
    return (
      <form id="domain_form" style={{
        visibility: this.props.style
      }}>
        <h1>{this.props.parentstate.workspace_name}({this.props.parentstate.domain})にサインイン</h1>
        <p>メールアドレスとパスワードを入力してください</p>
        <label>メールアドレス</label>
        <input type="text" id="email_input" className="biginput" ref="email"/>
        <label>パスワード</label>
        <input type="password" id="password_input" className="biginput" ref="password"/>
        <p className="existence_error" style={this.state.error_style}>メールアドレスかパスワードが間違っています。</p>
        <button onClick={this.signin.bind(this)} id="submit_domain" disabled={this.state.isdisabled}>
          続行する
        </button>
      </form >
    );
  }
}
