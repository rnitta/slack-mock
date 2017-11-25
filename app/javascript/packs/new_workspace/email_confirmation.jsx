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
  updateState(e) {
    e.preventDefault()
    var full_code = ''
    for (var i = 0; i < 6; i++) {
      full_code += document.getElementsByClassName('single_code_input')[i].value
    }
    if (full_code.length != 6) {
      return false
    }
    this.setState({isdisabled: true})

    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    axios.post('/api/check_code', {
      email: this.props.email,
      code: full_code
    }).then((results) => {
      console.log(results)
      if (results.data.success) {
        // Parentのステートを更新
        this.props.updateCode({code: full_code, token: results.data.token})
      }
    },).catch(() => {
      console.log('エラー')
      return false
    });
  }
  onInput(n) {
    // 6桁入力されたか監視
    var full_code = ''
    for (var i = 0; i < 6; i++) {
      full_code += document.getElementsByClassName('single_code_input')[i].value
    }
    if (full_code.length == 6) {
      this.setState({isdisabled: false})
    }
    //focusを次に移す
    document.getElementById('code_form').getElementsByClassName('focus')[n].focus()

  }
  render() {
    return (
      <form id="code_form" style={{
        visibility: this.props.style
      }}>
        <input type="text" maxLength="1" className="single_code_input focus" onInput={() => {
          this.onInput(1)
        }}/>
        <input type="text" maxLength="1" className="single_code_input focus" onInput={() => {
          this.onInput(2)
        }}/>
        <input type="text" maxLength="1" className="single_code_input focus" onInput={() => {
          this.onInput(3)
        }}/>
        <input type="text" maxLength="1" className="single_code_input focus" onInput={() => {
          this.onInput(4)
        }}/>
        <input type="text" maxLength="1" className="single_code_input focus" onInput={() => {
          this.onInput(5)
        }}/>
        <input type="text" maxLength="1" className="single_code_input focus" onInput={() => {
          this.onInput(6)
        }}/>
        <button id="submit_code" className="focus" disabled={this.state.isdisabled} onClick={this.updateState.bind(this)}>Enter</button>
      </form>
    );
  }
}
