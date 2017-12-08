import React from 'react'

export default class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div id="main_container">
        <div id="message_column"></div>
        <div id="flex_column"></div>
      </div>
    );
  }
}
