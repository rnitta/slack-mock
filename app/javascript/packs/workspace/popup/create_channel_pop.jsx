import React from 'react'

export default class CreateChannelPop extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div id="create_channel_pop">
        <div className="pop_container">
          <h1>Create a channel</h1>
          <div id="right_up">
            <button className="close_btn">×</button>
          </div>
          <form>
            <div className="input_group">
              <input type="radio" name="public" value="true" defaultChecked/>Public
              <input type="radio" name="public" value="false"/>Private
            </div>
            <div className="input_group">
              <label>Name</label>
              <input type="text" className="large_input" ref="name_input"/>
            </div>
            <div className="input_group">
              <label>Purpose (optional)</label>
              <input type="text" className="large_input" ref="topic_input"/>
            </div>
            <div className="input_group">
              <button className="large_btn">Create Channel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
