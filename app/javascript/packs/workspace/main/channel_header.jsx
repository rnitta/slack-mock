import React from 'react'
import axios from 'axios'

import TopicEditPop from '../popup/topic_edit_pop.jsx'
export default class ChannelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pop_topic_edit: false
    }
    if(this.props.grandparentstate.starred_channels.indexOf(this.props.grandparentstate.selected_channel.name) >= 0){
      this.state.star =  "★"
    }else{
      this.state.star =  "☆"
    }
  }
  componentWillReceiveProps(obj){
    if(obj.grandparentstate.starred_channels.indexOf(obj.grandparentstate.selected_channel.name) >= 0){
      this.state.star =  "★"
    }else{
      this.state.star =  "☆"
    }
  }
  click_star(e) {
    if (this.state.star == "☆") {
      this.setState({star: "★"}, this.post_star)
    } else {
      this.setState({star: "☆"}, this.post_star)
    }
  }
  post_star(){
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.grandparentstate.csrf_token
    axios.post('/channels/star', {
      jwt: this.props.grandparentstate.jwt,
      star: this.state.star == "★" ? true : false,
      channel: {
        name: this.props.grandparentstate.selected_channel.name
      }
    }).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.update_root_state(results.data)
      }
    },).catch(() => {
      alert('エラー')
    });
  }
  pop_topic_edit(){
    this.setState({pop_topic_edit: true})
  }
  hide_pop(){
    this.setState({pop_topic_edit: false})
  }
  update_root_state(obj){
    this.props.update_parent_state(obj)
  }
  render() {
    var topic
    if (!!this.props.grandparentstate.selected_channel.topic) {
      topic = "トピック: " + this.props.grandparentstate.selected_channel.topic
    } else {
      topic = "トピックを追加"
    }
    var channel_edit_pop
    if(this.state.pop_topic_edit){
      channel_edit_pop = <TopicEditPop hide_pop={this.hide_pop.bind(this)} rootstate={this.props.grandparentstate} update_root_state={this.update_root_state.bind(this)}/>
    }
    return (
      <div id="channel_header_container">
        <div className="header_left">
          <span className="channel_name_span"># {this.props.grandparentstate.selected_channel.name}</span>
          <div className="channel_header_info">
            <button className="star_btn" onClick={this.click_star.bind(this)}>{this.state.star}</button>
            <button className="members_count_btn">{this.props.grandparentstate.selected_channel.count}人</button>
            <button className="edit_topic_btn" onClick={this.pop_topic_edit.bind(this)}>{topic}</button>
          </div>
        </div>
        {channel_edit_pop}
      </div>
    );
  }
}
