import React from 'react'
import axios from 'axios'

export default class ParticipateChannelPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  hide() {
    this.props.update_state({participate_channel_pop: false})
  }
  render() {
    return (
      <div id="participate_channel_pop">
        <div className="pop_container">
          <h1>Join channels</h1>
          <div id="right_up">
            <button className="close_btn" onClick={this.hide.bind(this)}>×</button>
          </div>
          <form>
            
          </form>
        </div>
      </div>
    );
  }
}
