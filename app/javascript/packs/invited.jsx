import React from 'react'
import ReactDOM from 'react-dom'

class Parent extends React.Component {
  constructor(props) {
    super(props)
    let domain = location.pathname.split('/')[2]
    this.state = {
      csrf_token: document.querySelector('meta[name="csrf-token"]').getAttribute('content')
    }
  }
  render() {
    return (
      <div id="registration_with_invitation">

      </div>
    )
  }
}

ReactDOM.render(
  <Parent/>, document.getElementById("content"))
