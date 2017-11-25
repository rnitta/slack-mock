import React from 'react'
import axios from 'axios'

export default class WorkspaceDomainRegistration extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      workspace_domain: "",
      isdisabled: true
    }
  }
  update_state(e) {
    e.preventDefault()
    if (!this.state.workspace_domain && this.state.workspace_domain.length >= 22) {
      return false
    }
    this.setState({isdisabled: true})
    //　ドメインが重複していないかチェック
    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    axios.post('/api/check_domain', {
      domain: this.state.workspace_domain
    }).then((results) => {
      if (results.data.success) {
        // Parentのステートを更新
        this.props.update_workspace_domain({domain: this.state.workspace_domain})
      }else{
        alert('すでに存在します')
      }
    },).catch(() => {
      alert('エラー')
      return false
    });

  }

  validate_workspace_domain(e) {
    // ワークスペースドメインが有効か検証(空白・文字数)
    if (!!e.target.value && e.target.value.length < 22) {
      this.setState({workspace_domain: e.target.value, isdisabled: false})
    } else {
      this.setState({isdisabled: true})
    }
  }

  render() {
    return (
      <form id="workspace_domain_form" style={{
        visibility: this.props.style
      }}>
        <input type="text" maxLength="21" placeholder="workspace/xxxx <-" id="workspace_domain_input" autoComplete="off" onChange={(e) => this.validate_workspace_domain(e)}/>
        <button id="submit_creation" disabled={this.state.isdisabled} onClick={this.update_state.bind(this)}>Enter</button>
      </form>
    );
  }
}
