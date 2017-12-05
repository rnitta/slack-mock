import React from 'react'

export default class WSmenu extends React.Component {
  render() {
    return (
      <div className="workspace_menu" style={{
        display: this.props.style
      }}>
      <a href="/signin/new" target="_blank">他のワークスペースにサインインする</a>
      <a href="/workspaces/new" target="_blank">ワークスペースの作成</a>
      </div>
    );
  }
}
