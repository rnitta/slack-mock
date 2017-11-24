import React from 'react'
import ReactDOM from 'react-dom'

import Registration from './new_workspace/user_registration.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <Registration isdisabled="true" />
      </div>,
    document.getElementById("content"))
})
