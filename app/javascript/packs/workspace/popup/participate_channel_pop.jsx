import React from 'react'
import axios from 'axios'

export default class ParticipateChannelPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isdisabled: true,
      selected_channel: ""
    }
  }
  hide() {
    this.props.update_state({participate_channel_pop: false})
  }
  change_radio(e) {
    this.setState({isdisabled: false, selected_channel: e.target.value})
  }
  submit_join(e) {
    e.preventDefault()
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.grandparentstate.csrf_token
    axios.post('/channels/join', {
      jwt: this.props.grandparentstate.jwt,
      channel: {
        name: this.state.selected_channel
      }
    }).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.props.update_parent_state(results.data)
        this.hide()
      }
    },).catch(() => {
      alert('エラー')
    });
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
            <div className="input_group">
              {this.props.grandparentstate.available_channels.map((channel, n) => {
                return (
                  <div key={n} className="check_channels">
                    <input type="radio" value={channel} name="channels" onChange={this.change_radio.bind(this)}/>
                    <span>{channel}</span>
                  </div>
                )
              })
}
              {(() => {
                if (this.props.grandparentstate.available_channels == [])
                  return <p>no available channel</p>
              })()
}
            </div>
            <div className="input_group">
              <button className="large_btn" disabled={this.state.isdisabled} onClick={this.submit_join.bind(this)}>Join Channel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
