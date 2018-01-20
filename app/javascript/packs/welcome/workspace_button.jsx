import React from 'react'
import ReactDOM from 'react-dom'

export default class Button extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      menu_expanded: false
    }
  }
  expand_menu() {
    if (this.state.menu_expanded) {
      this.setState({menu_expanded: false})
    } else {
      this.setState({menu_expanded: true})
    }
  }
  render() {
    var exmenu = []
    if (this.state.menu_expanded) {
      for (var key in localStorage) {
        if (typeof localStorage[key] == 'string') {
          exmenu.push(
            <div key={JSON.parse(localStorage[key]).token}>
              <a href={"/workspaces/" + key}>{JSON.parse(localStorage[key]).workspace_name}</a>
            </div>
          )
        }
      }

    }
    return (
      <div>
        <button className="joined_workspaces_button" onClick={this.expand_menu.bind(this)}>参加中のワークスペース</button>
        <div className="joined_ws_list">{exmenu}</div>
      </div>
    );
  }
}
