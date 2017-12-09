import React from 'react'
import axios from 'axios'

export default class CreateChannelPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      public: "true",
      isdisabled: true
    }
  }
  hide() {
    this.props.update_state({create_channel_pop: false})
  }
  radio_onchange(e) {
    let ispublic = e.target.value
    this.setState({public: ispublic})
  }
  name_oninput() {
    if (!!this.refs.name_input.value) {
      this.setState({isdisabled: false})
    } else {
      this.setState({isdisabled: true})
    }
  }
  submit_creation(e) {
    e.preventDefault()
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.grandparentstate.csrf_token
    axios.post('/channels', {
      jwt: this.props.grandparentstate.jwt,
      channel: {
        name: this.refs.name_input.value,
        topic: this.refs.topic_input.value,
        public: (this.state.public == 'true') ? true : false
      }
    }).then((results) => {
      if (results.data.success) {
        this.hide()
      } else {
        alert('すでに存在するチャンネルです')
      }
    },).catch(() => {
      alert('エラー')
    });

  }
  render() {
    return (
      <div id="create_channel_pop">
        <div className="pop_container">
          <h1>Create a channel</h1>
          <div id="right_up">
            <button className="close_btn" onClick={this.hide.bind(this)}>×</button>
          </div>
          <form>
            <div className="input_group">
              <input type="radio" name="public" value="true" defaultChecked onChange={this.radio_onchange.bind(this)}/>Public
              <input type="radio" name="public" value="false" onChange={this.radio_onchange.bind(this)}/>Private
            </div>
            <div className="input_group">
              <label>Name</label>
              <input type="text" className="large_input" ref="name_input" onInput={this.name_oninput.bind(this)}/>
            </div>
            <div className="input_group">
              <label>Purpose (optional)</label>
              <input type="text" className="large_input" ref="topic_input"/>
            </div>
            <div className="input_group">
              <button className="large_btn" disabled={this.state.isdisabled} onClick={this.submit_creation.bind(this)}>Create Channel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
