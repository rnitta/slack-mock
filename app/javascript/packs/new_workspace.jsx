import React from 'react'
import ReactDOM from 'react-dom'

import EmailRegistration from './new_workspace/email_registration.jsx'
import NameRegistration from './new_workspace/name_registration.jsx'
import PasswordRegistration from './new_workspace/password_registration.jsx'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      user_name: "",
      display_name: "",
      style_email: "visible",
      style_name: "hidden",
      style_password: "hidden"

    }
  }
  updateEmail(email) {
    this.setState({style_email: "hidden", style_name: "visible"})
    this.setState(email)
  }
  updateName(name) {
    this.setState({style_name: "hidden", style_password: "visible"})
    this.setState(name, () => {})
  }
  updatePassword(password) {
    this.setState({style_password: "hidden"})
    this.setState(password, () => {})
  }

  render() {
    return (
      <div>
        <EmailRegistration style={this.state.style_email} updateEmail={this.updateEmail.bind(this)}/>
        <NameRegistration style={this.state.style_name} updateName={this.updateName.bind(this)}/>
        <PasswordRegistration style={this.state.style_password} updatePassword={this.updatePassword.bind(this)}/>
      </div>
    )
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Parent/>, document.getElementById("content"))
})
