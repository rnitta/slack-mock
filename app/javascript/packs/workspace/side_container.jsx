import React from 'react'
import axios from 'axios'

export default class SideContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      channels: {}
    }
    this.workspace_data()
  }
  workspace_data(){
    let domain = location.pathname.split('/')[2]
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.parentstate.csrf_token
    axios.post('/workspaces/data', {
      signin: {
        token: JSON.parse(localStorage.getItem(domain)).token
      }
    }).then((results) => {
      if(results.data.success){
        delete(results.data.success)
        console.log(results.data)
        this.props.update_state(obj)
      }
    },).catch(() => {
      alert('エラー')
    });

  }
  render() {
    return (
      <div id="side_container">
        <div id="team_menu"></div>
        <div id="starred_menu"></div>
        <div id="channel_menu">

        </div>
        <div id="dm_menu"></div>
        <div id="bottom_menu"></div>
      </div>
    );
  }
}
