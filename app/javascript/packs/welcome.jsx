import React from 'react'
import ReactDOM from 'react-dom'

import Button from './welcome/workspace_button.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <Button classname="workspace_btn" text="Your Workspase"/>
      </div>,
    document.getElementById("content"))
})
