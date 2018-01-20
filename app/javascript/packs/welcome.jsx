import React from 'react'
import ReactDOM from 'react-dom'

import Button from './welcome/workspace_button.jsx'
import WSmenu from './welcome/workspace_menu.jsx'

  ReactDOM.render(
    <div className="root_menu">
      <Button className="workspace_btn" text="Your Workspase"/>
        <WSmenu />
      </div>,
    document.getElementById("content"))
