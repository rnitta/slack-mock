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
      domain: "",
      workspace_name: "",
      style_email: "visible",
      style_code: "hidden",
      style_name: "hidden",
      style_password: "hidden",
      style_workspacename: "hidden",
      style_workspacedomain: "hidden",
      csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
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
    axios.defaults.headers['X-CSRF-TOKEN'] = this.state.csrf_token
    axios.post('/workspaces', {
      workspace: {
        name: this.state.workspace_name,
        domain: this.state.domain
      },
      user: {
        display_name: this.state.display_name,
        user_name: this.state.user_name,
        password: this.state.password,
        password_confirmation: this.state.password
      },
      token: this.state.token
    }).then((results) => {
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
        <EmailRegistration style={this.state.style_email} update_email={this.update_email.bind(this)} csrf_token={this.state.csrf_token}/>
        <EmailConfirmation style={this.state.style_code} email={this.state.email} update_code={this.update_code.bind(this)} csrf_token={this.state.csrf_token}/>
        <NameRegistration style={this.state.style_name} update_name={this.update_name.bind(this)}/>
        <PasswordRegistration style={this.state.style_password} update_password={this.update_password.bind(this)}/>
        <WorkspaceName style={this.state.style_workspacename} update_workspace_name={this.update_workspace_name.bind(this)} csrf_token={this.state.csrf_token}/>
        <WorkspaceDomain style={this.state.style_workspacedomain} update_workspace_domain={this.update_workspace_domain.bind(this)} csrf_token={this.state.csrf_token}/>
      </div>
    )
  }
}

  ReactDOM.render(
    <Parent/>, document.getElementById("content"))
