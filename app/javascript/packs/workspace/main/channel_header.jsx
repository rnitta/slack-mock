import React from 'react'
import axios from 'axios'

export default class ChannelHeader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div id="channel_header_container">
        <div className="header_left">
          <span className="channel_name_span"># {this.props.grandparentstate.selected_channel}</span>
          <div className="channel_header_info">
            <button className="star_btn">☆</button>
            <button className="members_count_btn">n</button>
            <button className="edit_topic_btn">トピックを編集</button>
          </div>
        </div>
      </div>
    );
  }
}
