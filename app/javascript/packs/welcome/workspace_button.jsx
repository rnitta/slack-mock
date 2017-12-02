import React from 'react'
import ReactDOM from 'react-dom'

import WSmenu from './workspace_menu.jsx'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      style_wsmenu: "none"
    }
  }
  expandMenu() {
    this.setState({style_wsmenu: "block"})
  }

  render() {
    return (
      <div>
        <button className={this.props.classname} onClick={this.expandMenu.bind(this)}>{this.props.text}</button>
        <WSmenu style={this.state.style_wsmenu}/>
      </div>
    );
  }
}
