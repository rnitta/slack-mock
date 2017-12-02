import React from 'react'
import axios from 'axios'

export default class EmailConfirmation extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      isdisabled: true,
      code: ""
    }
  }
  update_state(e) {
    e.preventDefault()
    var full_code = ''
    Object.keys(this.refs).forEach((key) => {
      full_code += this.refs[key].value
    })
    if (full_code.length != 6) {
      return false
    }
    this.setState({isdisabled: true})

    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.csrf_token
    axios.post('/emails/code/check', {
      email: this.props.email,
      code: full_code
    }).then((results) => {
      if (results.data.success) {
        // Parentのステートを更新
        this.props.update_code({code: full_code, token: results.data.token})
      } else {
        alert('コードが違います')
        console.log(this)
        Object.keys(this.refs).forEach((key) => {
          this.refs[key].value = ""
        })
        this.refs.input1.focus()
      }
    },).catch(() => {
      alert('エラー')
    });
  }
  onInput(e) {
    //focusを次に移す
    this.refs["input" + e.target.getAttribute('data-next')].focus()
    // 6桁入力されたか監視
    var full_code = ''
    Object.keys(this.refs).forEach((key) => {
      full_code += this.refs[key].value
    })
    if (full_code.length == 6) {
      this.setState({isdisabled: false})
    } else {
      this.setState({isdisabled: true})
    }
  }
  onFocus(e) {
    //入力ミス時のBSキーでonInputが発火する対策
    if (!!e.target.value) {
      e.target.value = ""
      this.setState({isdisabled: true})
    }
  }
  render() {
    return (
      <form id="code_form" style={{
        visibility: this.props.style
      }}>
        <h1>メールをチェックしてください</h1>
        <p>６桁の数字のコードを記載したメールを{this.props.email}に送信しました。</p>
        <label>確認コード</label>
        <div className="code_inputs">
          <input type="text" maxLength="1" ref="input1" data-next="2" onInput={this.onInput.bind(this)} onFocus={this.onFocus.bind(this)}/>
          <input type="text" maxLength="1" ref="input2" data-next="3" onInput={this.onInput.bind(this)} onFocus={this.onFocus.bind(this)}/>
          <input type="text" maxLength="1" ref="input3" data-next="4" onInput={this.onInput.bind(this)} onFocus={this.onFocus.bind(this)}/>
          <input type="text" maxLength="1" ref="input4" data-next="5" onInput={this.onInput.bind(this)} onFocus={this.onFocus.bind(this)}/>
          <input type="text" maxLength="1" ref="input5" data-next="6" onInput={this.onInput.bind(this)} onFocus={this.onFocus.bind(this)}/>
          <input type="text" maxLength="1" ref="input6" data-next="6" onInput={this.onInput.bind(this)} onFocus={this.onFocus.bind(this)}/>
        </div>
        <button id="submit_code" disabled={this.state.isdisabled} onClick={this.update_state.bind(this)}>Enter</button>
      </form>
    );
  }
}
