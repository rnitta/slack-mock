import React from 'react'
import axios from 'axios'

import ChannelHeader from './main/channel_header.jsx'
import DmHeader from './main/dm_header.jsx'
import MessageForm from './main/message_form.jsx'
import Message from './main/message.jsx'
export default class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  get_message_list() {
    var type = this.props.parentstate.selected
    var name = ""
    if (type == "user") {
      name = this.props.parentstate.selected_user.user_name
    } else if (type == "channel") {
      name = this.props.parentstate.selected_channel.name
    }
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.parentstate.csrf_token
    axios.post('/workspaces/messages', {
      jwt: this.props.parentstate.jwt,
      type: type,
      name: name
    }).then((results) => {
      if (results.data.success) {
        this.setState({messages: results.data.messages}, ()=>{console.log(this.state)})
      }
    },).catch(() => {
      alert('エラー')
    });
  }
  update_parent_state(obj) {
    this.props.update_state(obj)
  }
  render() {
    var message_list = []
    if (!!this.state.messages) {
      this.state.messages.map((message, i)=>{
        message_list.push(<Message key={message.id} message={message} rootstate={this.props.parentstate}/>)
      })
    }
    if (!!this.props.parentstate.selected) {
      var header = []
      if (this.props.parentstate.selected == "channel") {
        header = <ChannelHeader update_parent_state={this.update_parent_state.bind(this)} grandparentstate={this.props.parentstate}/>
      } else if (this.props.parentstate.selected == "user") {
        header = <DmHeader grandparentstate={this.props.parentstate}/>
      }
      return (
        <div id="main_container">
          <div id="header_column">
            {header}
          </div>
          <div id="message_column">
            {message_list}
          </div>
          <div id="fixed_column">
            <MessageForm grandparentstate={this.props.parentstate}/>
          </div>
        </div>
      );
    } else {
      return (
        <p>select something</p>
      )
    }
  }
}
