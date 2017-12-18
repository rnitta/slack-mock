import React from 'react'
import axios from 'axios'

export default class TopicEditPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    this.refs.topic_edit_form.innerText = this.props.rootstate.selected_channel.topic
  }
  submit_topic(e) {
    e.preventDefault()
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.rootstate.csrf_token
    axios.post('/channels/topic', {
      jwt: this.props.rootstate.jwt,
      channel: {
        name: this.props.rootstate.selected_channel.name,
        topic: this.refs.topic_edit_form.innerText.replace(/\r?\n/g, "")
      }
    }).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.props.update_root_state(results.data)
        this.props.hide_pop()
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
          <div id="topic_edit_inner">
            <div contentEditable="true" ref="topic_edit_form" className="topic_edit_form"></div>
            <button className="large_btn" onClick={this.submit_topic.bind(this)}>トピックを編集する</button>
          </div>
        </div>
      </div>
    );
  }
}
