import React from 'react'

import ChannelHeader from './main/channel_header.jsx'
import DmHeader from './main/dm_header.jsx'
import MessageForm from './main/message_form.jsx'
export default class MainContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  update_parent_state(obj) {
    this.props.update_state(obj)
  }
  render() {
    if(!!this.props.parentstate.selected){
      var header = []
      if(this.props.parentstate.selected == "channel"){
          header = <ChannelHeader update_parent_state={this.update_parent_state.bind(this)} grandparentstate={this.props.parentstate}/>
      }else if (this.props.parentstate.selected == "user") {
        header = <DmHeader grandparentstate={this.props.parentstate}/>
      }
    return (
      <div id="main_container">
        <div id="header_column">
          {header}
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
