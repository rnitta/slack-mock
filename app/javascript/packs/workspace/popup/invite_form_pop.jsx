import React from 'react'
import axios from 'axios'

export default class InviteFormPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isdisabled: true
    }
  }
  hide_pop() {
    this.props.update_state({invite_form_pop: false})
  }
  render() {
    return (
      <div id="invite_form_pop">
        <div className="pop_container">
          <h1>Invite people to this workspace</h1>
          <div id="right_up">
            <button className="close_btn" onClick={this.hide_pop.bind(this)}>×</button>
          </div>
          <form>
            <div className="input_group">
              <label>Email Address</label>
              <input type="text" className="large_input" />
            </div>
            <div className="input_group">
              <button className="large_btn" disabled={this.state.isdisabled}>Invite People</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
