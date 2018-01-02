import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './workspace/cable.js'
import SideContainer from './workspace/side_container.jsx'
import MainContainer from './workspace/main_container.jsx'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    let domain = location.pathname.split('/')[2]
    this.state = {
      jwt: JSON.parse(localStorage.getItem(domain)).token,
      csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
      selected_channel: "",
      selected_user: "",
      domain: domain
    }
  }
  componentDidMount() {
    let self = this
    App.appearance = App.cable.subscriptions.create({
      channel: "AppearanceChannel"
    }, {
      connected: function() {}, //接続時
      disconnected: function() {}, //切断時
      received: function(data) { //受信時
        self.setState({users: data.users})
        let user_arr = data.users.filter((user) => {
          if (user.user_name == self.state.user_name)
            return true
        })
        if (user_arr[0] && user_arr[0].status == 0) {
          this.perform('activate_user')
        }
      }
    })
    window.chat = App.cable.subscriptions.create({
      channel: "WorkspaceChannel"
    }, {
      received: (data) => { //受信時
        this.refs.main.receive_messsage(data)
      }
    })
  }
  update_state(obj) {
    this.setState(obj, () => {
      console.log(this.state)
      if (!!this.state.selected_channel) {
        this.switch_channel(this.state.selected_channel.name)
      }
    })
  }
  switch_channel(channel) {
    var selected_channel = this.state.joined_channels.filter(function(item, i) {
      if (item.name == channel)
        return true
    })
    this.setState({
      selected: "channel",
      selected_channel: selected_channel[0]
    }, () => {
      // switch
      this.refs.main.get_message_list()
      console.log(this.state)
    })
  }
  switch_dm(user) {
    var selected_user = this.state.users.filter(function(item, i) {
      if (user == item.user_name)
        return true
    })
    this.setState({
      selected: "user",
      selected_user: selected_user[0]
    }, () => {
      // switch
      this.refs.main.get_message_list()
      console.log(this.state)
    })
  }
  render() {
    return (
      <div id="client_ui">
        <div id="client_container">
          <SideContainer parentstate={this.state} update_state={this.update_state.bind(this)} switch_channel={this.switch_channel.bind(this)} switch_dm={this.switch_dm.bind(this)}/>
          <MainContainer parentstate={this.state} update_state={this.update_state.bind(this)} ref="main"/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>, document.getElementById("content"))
