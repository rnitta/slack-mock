import React from 'react'
import axios from 'axios'

export default class InviteFormPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invalid_error: false,
      existence_error: true
    }
  }
  hide_pop() {
    this.props.update_state({invite_form_pop: false})
  }
  submit_invitation(e){
    e.preventDefault()
    this.setState({invalid_error: false})
    let email = this.refs.invite_email_input.value
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)){
      this.setState({invalid_error: true})
      return false
    }
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.grandparentstate.csrf_token
    axios.post('/workspaces/invite', {
      jwt: this.props.grandparentstate.jwt,
      invitation: {email: email}
    }).then((results) => {
      if (results.data.success) {
        alert('done!')
        this.hide_pop()
      }else{
        alert('すでに登録されたメールアドレスです')
        this.hide_pop()
      }
    },).catch(() => {
      alert('エラー')
    });
  }
  render() {
    var invalid_error = []
    if(this.state.invalid_error){
      invalid_error = <p className="error_p">無効なメールアドレスです。</p>
    }
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
              <input type="text" className="large_input" ref="invite_email_input"/>
              {invalid_error}
            </div>
            <div className="input_group">
              <button className="large_btn" onClick={this.submit_invitation.bind(this)}>Invite People</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
