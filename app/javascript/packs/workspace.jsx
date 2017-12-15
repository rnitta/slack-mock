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
      selected_channel:""
    }
    App.room = App.cable.subscriptions.create({
      channel: "WorkspaceChannel"
    }, {
      connected: function() {
        alert('done')
      }, //接続時
      disconnected: function() {}, //切断時
      received: function(data) { //受信時
      },
      send_message: function(message) { //送信時
      }
    })
  }
  update_state(obj) {
    this.setState(obj, () => {
      console.log(this.state)
    })
  }
  switch_channel(channel){
    this.setState({selected_channel: channel},()=>{
      // switch
    })
  }
  render() {
    return (
      <div id="client_ui">
        <div id="client_container">
          <SideContainer parentstate={this.state} update_state={this.update_state.bind(this)} switch_channel={this.switch_channel.bind(this)}/>
          <MainContainer/>
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>, document.getElementById("content"))
