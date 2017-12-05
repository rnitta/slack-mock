import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

import App from './workspace/cable.js'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  render() {
    return (
      <div>
      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>, document.getElementById("content"))
