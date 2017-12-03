import React from 'react'
import ReactDOM from 'react-dom'

import WorkspaceDomain from './signin/workspace_domain.jsx'
import EmailPassword from './signin/email_password.jsx'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      domain: "",
      workspace_name: "",
      email: "",
      password: "",
      style_workspace: "visible",
      style_email_password: "hidden",
      csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  }
  update_domain(obj) {
    this.setState(obj)
    this.setState({style_workspace: "hidden", style_email_password: "visible"})
  }
  update_email_password(obj) {
    this.setState(obj, () => {
      console.log(this.state)
    })
  }
  render() {
    return (
      <div className="form_wrapper">
        <WorkspaceDomain style={this.state.style_workspace} update_domain={this.update_domain.bind(this)}  csrf_token={this.state.csrf_token}/>
        <EmailPassword style={this.state.style_email_password} parentstate={this.state} update_email_password={this.update_email_password.bind(this)} csrf_token={this.state.csrf_token}/>
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>, document.getElementById("content"))
