import React from 'react'
import axios from 'axios'
let regex = /^[a-zA-Z]{1}[0-9a-zA-Z]+[\w\.-]+@[\w\.-]+\.\w{2,}$/ //要検証
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
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.csrf_token
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
        <h1>ワークスペースを新規作成する</h1>
        <label>メールアドレス</label>
        <input type="email" placeholder="your@adress.here" id="email_input" className="biginput" pattern="^[a-zA-Z]{1}[0-9a-zA-Z]+[\w\.-]+@[\w\.-]+\.\w{2,}$" onChange={(e) => this.validate_email(e)}/>
        <button id="submit_email" disabled={this.state.isdisabled} onClick={this.update_state.bind(this)}>次へ</button>
      </form>
    );
  }
}
