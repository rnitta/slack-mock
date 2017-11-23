import React from 'react'
import ReactDOM from 'react-dom'

import Button from './workspace_button.jsx'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
  <div>
    <Button classname="workspace" text="Your Workspase"/>
  </div>,
    document.body.appendChild(document.createElement('div'))
  )
})
