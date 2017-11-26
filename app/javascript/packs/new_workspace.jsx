import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import EmailRegistration from './new_workspace/email_registration.jsx'
import EmailConfirmation from './new_workspace/email_confirmation.jsx'
import NameRegistration from './new_workspace/name_registration.jsx'
import PasswordRegistration from './new_workspace/password_registration.jsx'
import WorkspaceName from './new_workspace/workspace_name_registration.jsx'
import WorkspaceDomain from './new_workspace/workspace_domain_registration.jsx'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      user_name: "",
      display_name: "",
      code: "",
      token: "",
      style_email: "visible",
      style_code: "hidden",
      style_name: "hidden",
      style_password: "hidden",
      style_workspacename: "hidden",
      style_workspacedomain: "hidden"

    }
  }
  update_email(email) {
    this.setState({style_email: "hidden", style_code: "visible"})
    this.setState(email)
  }
  update_code(code) {
    this.setState({style_code: "hidden", style_name: "visible"})
    this.setState(code)
  }
  update_name(name) {
    this.setState({style_name: "hidden", style_password: "visible"})
    this.setState(name)
  }
  update_password(password) {
    this.setState({style_password: "hidden", style_workspacename: "visible"})
    this.setState(password)
  }
  update_workspace_name(workspace_name) {
    this.setState({style_workspacename: "hidden", style_workspacedomain: "visible"})
    this.setState(workspace_name)
  }
  update_workspace_domain(workspace_domain) {
    this.setState({style_workspacedomain: "hidden"})
    this.setState(workspace_domain)
    this.create_workspace()
  }
  create_workspace() {
    console.log(this.state)
    axios.defaults.headers['X-CSRF-TOKEN'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    axios.post('/api/create_workspace', this.state).then((results) => {
      if (results.data.success) {
        alert('done!')
      } else {
        alert('エラー')
      }
    },).catch(() => {
      alert('エラー')
      return false
    });
  }

  render() {
    return (
      <div className="form_wrapper">
        <EmailRegistration style={this.state.style_email} update_email={this.update_email.bind(this)}/>
        <EmailConfirmation style={this.state.style_code} email={this.state.email} update_code={this.update_code.bind(this)}/>
        <NameRegistration style={this.state.style_name} update_name={this.update_name.bind(this)}/>
        <PasswordRegistration style={this.state.style_password} update_password={this.update_password.bind(this)}/>
        <WorkspaceName style={this.state.style_workspacename} update_workspace_name={this.update_workspace_name.bind(this)}/>
        <WorkspaceDomain style={this.state.style_workspacedomain} update_workspace_domain={this.update_workspace_domain.bind(this)}/>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Parent/>, document.getElementById("content"))
})
