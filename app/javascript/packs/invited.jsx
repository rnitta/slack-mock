import React from 'react'
import ReactDOM from 'react-dom'

import DisplayInfos from './invited/display_infos.jsx'
class Parent extends React.Component {
  constructor(props) {
    super(props)
    let token = location.pathname.split('/')[3]
    this.state = {
      jwt: token,
      csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      display_infos: true,
      invitor: "",
      workspace_name: "",
      domain: "",
      email: ""
    }
  }
  render() {
    var display_infos = []
    if(this.state.display_infos){
      display_infos = <DisplayInfos state={this.state} update_state={(obj)=>{this.setState(obj)}}/>
    }
    return (
      <div id="registration_with_invitation">
        {display_infos}
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>, document.getElementById("content"))
