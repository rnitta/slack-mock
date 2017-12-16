import React from 'react'
import axios from 'axios'

export default class ChannelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  click_star(e){
    if(e.target.innerText == "☆"){
    e.target.innerText="★"
  }else{
    e.target.innerText="☆"
    }
  }
  render() {
    var topic
    if(!!this.props.grandparentstate.selected_channel.topic){
         topic = "トピック: "+this.props.grandparentstate.selected_channel.topic
    }else {
       topic = "トピックを追加"
    }
    return (
      <div id="channel_header_container">
        <div className="header_left">
          <span className="channel_name_span"># {this.props.grandparentstate.selected_channel.name}</span>
          <div className="channel_header_info">
            <button className="star_btn" onClick={this.click_star.bind(this)}>☆</button>
            <button className="members_count_btn">{this.props.grandparentstate.selected_channel.count}人</button>
            <button className="edit_topic_btn">{topic}</button>
          </div>
        </div>
      </div>
    );
  }
}
