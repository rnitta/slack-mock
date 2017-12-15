import React from 'react'

import ChannelHeader from './main/channel_header.jsx'
import MessageForm from './main/message_form.jsx'
export default class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    if(!!this.props.parentstate.selected_channel){
    return (
      <div id="main_container">
        <div id="header_column">
          <ChannelHeader grandparentstate={this.props.parentstate}/>
        </div>
        <div id="message_column">
          
        </div>
        <div id="fixed_column">
          <MessageForm grandparentstate={this.props.parentstate}/>
        </div>
      </div>
    );
  }else{
    return (<p>select something</p>)
  }
  }
}
