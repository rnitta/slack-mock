import React from 'react'
import axios from 'axios'

export default class WorkspaceDomain extends React.Component {
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
  confirm_domain() {
    let input_domain = this.refs.domain.value
    this.setState({
      isdisabled: true,
      error_style: {
        display: "none"
      }
    })
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.csrf_token
    axios.post('/workspaces/domain/check', {domain: input_domain}).then((results) => {
      if (!results.data.success) {
        // Parentのステートを更新
        this.props.update_domain({domain: input_domain, workspace_name: results.data.name})
      } else {
        this.setState({
          isdisabled: false,
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
        <h1>ワークスペースにサインインする</h1>
        <p>参加しているワークスペースのURLを入力してください</p>
        <div className="domain_input">
          <span>/workspace/</span><input type="text" id="domain_input" className="biginput" ref="domain"/>
        </div>
        <p className="existence_error" style={this.state.error_style}>存在しないワークスペースです。</p>
        <button onClick={this.confirm_domain.bind(this)} id="submit_domain" disabled={this.state.isdisabled}>
          続行する
        </button>
      </form >
    );
  }
}
