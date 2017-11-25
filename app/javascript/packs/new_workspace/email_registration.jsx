import React from 'react'
import axios from 'axios'
let regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/ //要検証
export default class EmailRegistration extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      isdisabled: true,
      email: ""
    }
  }
  update_state(e) {
    e.preventDefault()
    if (!regex.test(this.state.email)) {
      return false
    }
    this.setState({isdisabled: true})
    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    axios.post('/api/new_email', {email: this.state.email}).then((results) => {
      if (results.data.success) {
        // Parentのステートを更新
        this.props.update_email({email: this.state.email})
      }
    },).catch(() => {
      console.log('エラー')
      return false
    });
  }
  validate_email(e) {
    // メールアドレスが有効か検証
    if (regex.test(e.target.value)) {
      this.setState({isdisabled: false, email: e.target.value})
    } else {
      this.setState({isdisabled: true})
    }
  }
  render() {
    return (
      <form id="email_form" style={{
        visibility: this.props.style
      }}>
        <input type="email" placeholder="your@adress.here" id="email_input" onChange={(e) => this.validate_email(e)}/>
        <button id="submit_email" disabled={this.state.isdisabled} onClick={this.update_state.bind(this)}>Enter</button>
      </form>
    );
  }
}
