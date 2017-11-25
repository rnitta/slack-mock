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
  updateState(e) {
    e.preventDefault()
    if (!this.state.workspace_name && this.state.workspace_name.length >= 51) {
      return false
    }
    // Parentのステートを更新
    this.props.updateWorkspaceName({workspace_name: this.state.workspace_name})
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
        <input type="text" maxLength="50" placeholder="組織名" id="workspace_name_input" autoComplete="off" onChange={(e) => this.validate_workspace_name(e)}/>
        <button id="submit_workspace_name" disabled={this.state.isdisabled} onClick={this.updateState.bind(this)}>Enter</button>
      </form>
    );
  }
}
