import React from 'react'

export default class SideContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div id="side_container">
        <div id="team_menu"></div>
        <div id="starred_menu"></div>
        <div id="channel_menu"></div>
        <div id="dm_menu"></div>
        <div id="bottom_menu"></div>
      </div>
    );
  }
}
