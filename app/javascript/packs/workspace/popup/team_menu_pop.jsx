import React from 'react'
import axios from 'axios'

export default class TeamMenuPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  hide_pop(){
    
  }
  render() {
    return (
      <div id="team_menu_pop">
        <div id="team_menu_outer" onClick={this.hide_pop.bind(this)}>
          <div id="team_menu_inner">
            <div id="user_menu_container"></div>
            <div id="workspace_menu_container">

            </div>
          </div>
        </div>
      </div>
    );
  }
}
