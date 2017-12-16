import React from 'react'
import axios from 'axios'

export default class ChannelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    if(this.props.grandparentstate.starred_channels.indexOf(this.props.grandparentstate.selected_channel.name) >= 0){
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
        this.props.update_parent_state(results.data)
      }
    },).catch(() => {
      alert('エラー')
    });
  }
  render() {
    var topic
    if (!!this.props.grandparentstate.selected_channel.topic) {
      topic = "トピック: " + this.props.grandparentstate.selected_channel.topic
    } else {
      topic = "トピックを追加"
    }
    return (
      <div id="channel_header_container">
        <div className="header_left">
          <span className="channel_name_span"># {this.props.grandparentstate.selected_channel.name}</span>
          <div className="channel_header_info">
            <button className="star_btn" onClick={this.click_star.bind(this)}>{this.state.star}</button>
            <button className="members_count_btn">{this.props.grandparentstate.selected_channel.count}人</button>
            <button className="edit_topic_btn">{topic}</button>
          </div>
        </div>
      </div>
    );
  }
}
