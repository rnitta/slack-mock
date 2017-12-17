import React from 'react'
import axios from 'axios'

export default class TopicEditPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  hide() {
    this.props.update_state({create_channel_pop: false})
  }
  submit_creation(e) {
    e.preventDefault()
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.grandparentstate.csrf_token
    axios.post('/channels', {
      jwt: this.props.grandparentstate.jwt,
      channel: {
        name: this.refs.name_input.value,
        topic: this.refs.topic_input.value,
        public: (this.state.public == 'true')
          ? true
          : false
      }
    }).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.props.update_parent_state(results.data)
        this.hide()
      } else {
        alert('すでに存在するチャンネルです')
      }
    },).catch(() => {
      alert('エラー')
    });

  }
  hide_pop(e) {
    if (e.target.id == "topic_edit_outer") {
      this.props.hide_pop()
    }
  }
  render() {
    return (
      <div id="topic_edit_pop">
        <div id="topic_edit_outer" onClick={this.hide_pop.bind(this)}>
          <div id="topic_edit_inner" onClick={this.stop_progation}></div>
        </div>
      </div>
    );
  }
}
