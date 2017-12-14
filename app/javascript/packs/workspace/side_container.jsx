import React from 'react'
import axios from 'axios'

import CreateChannelPop from './popup/create_channel_pop.jsx'
import ParticipateChannelPop from './popup/participate_channel_pop.jsx'
export default class SideContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: {},
      create_channel_pop: false,
      create_channel_pop: false
    }
    this.workspace_data()
  }
  workspace_data() {
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.parentstate.csrf_token
    axios.post('/workspaces/data', {jwt: this.props.parentstate.jwt}).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.props.update_state(results.data)
      }
    },).catch(() => {
      alert('エラー')
    });

  }
  pop_create_channel(){
    this.setState({create_channel_pop: true})
  }
  pop_participate_channel(){
    this.setState({participate_channel_pop: true})
  }
  update_state(obj){
    this.setState(obj)
  }
  update_parent_state(obj){
    this.props.update_state(obj)
  }
  render() {
    return (
      <div id="side_container">
        <div id="team_menu"></div>
        <div id="starred_menu"></div>
        <div id="channel_menu">
          <p className="menu_line">
            <button id="channels_button" onClick={this.pop_participate_channel.bind(this)}>Channels</button>
            <button id="create_channel_button" onClick={this.pop_create_channel.bind(this)}>+</button>
          </p>
        </div>
        <div id="dm_menu"></div>
        <div id="bottom_menu"></div>
          {(()=>{if(this.state.create_channel_pop){return <CreateChannelPop update_state={this.update_state.bind(this)} grandparentstate={this.props.parentstate} />}})()}
          {(()=>{if(this.state.participate_channel_pop){return <ParticipateChannelPop update_state={this.update_state.bind(this)} update_parent_state={this.update_parent_state.bind(this)} grandparentstate={this.props.parentstate} />}})()}
      </div>
    );
  }
}
