import React from 'react'
import axios from 'axios'

export default class TeamMenuPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  hide_pop(e) {
    if (e.target.id == "team_menu_outer") {
      this.props.update_state({team_menu_pop: false})
    }
  }
  pop_invite_form(){
    this.props.update_state({team_menu_pop: false, invite_form_pop: true})
  }
  render() {
    return (
      <div id="team_menu_pop">
        <div id="team_menu_outer" onClick={this.hide_pop.bind(this)}>
          <div id="team_menu_inner">
            <div id="user_menu_container">
              <div id="user_menu_header">
                <p id="your_display_name">{this.props.grandparentstate.display_name}</p>
              </div>
            </div>
            <div id="workspace_menu_container">
              <div id="workspace_menu_header">
                <p id="current_team_name">{this.props.grandparentstate.workspace_name}</p>
                <p id="current_team_domain">({this.props.grandparentstate.domain})</p>
              </div>
              <ul>
                <li><button id="invite_pop_btn" onClick={this.pop_invite_form.bind(this)} >Invite People</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
