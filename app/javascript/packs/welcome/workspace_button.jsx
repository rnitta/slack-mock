import React from 'react'
import ReactDOM from 'react-dom'

import WSmenu from './workspace_menu.jsx'

export default class Button extends React.Component {
  expandMenu() {
    ReactDOM.render(
      <WSmenu/>,
    document.body.appendChild(document.createElement('div'))
    );
  }

  render() {
    return (
      <button className={this.props.classname} onClick={this.expandMenu.bind(this)}>{this.props.text}</button>
    );
  }
}
