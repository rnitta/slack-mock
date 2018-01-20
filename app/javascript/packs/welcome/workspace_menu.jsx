import React from 'react'

export default class WSmenu extends React.Component {
  render() {
    return (
      <div style={{
        display: this.props.style
      }}>
      <a className="wsmenu_link" href="/signin/new" target="_blank">他のワークスペースにサインインする</a>
      <a className="wsmenu_link" href="/workspaces/new" target="_blank">ワークスペースの作成</a>
      </div>
    );
  }
}
