import React from 'react'

export default class WorkspaceName extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      workspace_name: "",
      isdisabled: true
    }
  }
  update_state(e) {
    e.preventDefault()
    if (!this.state.workspace_name && this.state.workspace_name.length >= 51) {
      return false
    }
    // Parentのステートを更新
    this.props.update_workspace_name({workspace_name: this.state.workspace_name})
  }
  validate_workspace_name(e) {
    // ワークスペース名が有効か検証(空白・文字数)
    if (!!e.target.value && e.target.value.length < 51) {
      this.setState({workspace_name: e.target.value, isdisabled: false})
    } else {
      this.setState({isdisabled: true})
    }
  }

  render() {
    return (
      <form id="workspace_name_form" style={{
        visibility: this.props.style
      }}>
      <h1>会社名 (団体名) は何ですか？</h1>
      <label>会社名 (団体名)</label>
        <input type="text" maxLength="50" placeholder="会社名 (団体名)" id="workspace_name_input" className="biginput" autoComplete="off" onChange={(e) => this.validate_workspace_name(e)}/>
        <button id="submit_workspace_name" disabled={this.state.isdisabled} onClick={this.update_state.bind(this)}>Enter</button>
      </form>
    );
  }
}
