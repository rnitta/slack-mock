import React from 'react'

export default class WSmenu extends React.Component {
  render() {
    return (
      <div className="workspace_menu" style={{
        display: this.props.style
      }}>
      <a href="/signin" target="_blank">他のワークスペースにサインインする</a>
      <a href="/workspaces" target="_blank">ワークスペースの作成</a>
      </div>
    );
  }
}
