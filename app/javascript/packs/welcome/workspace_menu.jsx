import React from 'react'

export default class WSmenu extends React.Component {
  render() {
    return (
      <div className="workspace_menu" style={{
        display: this.props.style
      }}>
        <a href="/workspaces" target="_blank">Create New Workspace</a>
      </div>
    );
  }
}
