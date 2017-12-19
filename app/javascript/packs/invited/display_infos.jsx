import React from 'react'
import axios from 'axios'

export default class DisplayInfos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isdisabled: true
    }
  }
  componentDidMount() {
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.state.csrf_token
    axios.post('/invitations/data', {jwt: this.props.state.jwt}).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.props.update_state(results.data)
        this.setState({isdisabled: false})
      }
    },).catch(() => {
      alert('エラー')
    })
  }
  go_next(){
    this.props.update_state({display_infos: false, input_infos: true})
  }
  render() {
    return (
      <div id="display_infos">
        <h1>招待情報</h1>
        <ul className="infos_ul">
          <li>招待者:  {this.props.state.invitor}</li>
          <li>チーム名:  {this.props.state.workspace_name}</li>
          <li>ドメイン:  {this.props.state.domain}</li>
          <li>メールアドレス:  {this.props.state.email}</li>
        </ul>
        <button className="large_btn" disabled={this.state.true} onClick={this.go_next.bind(this)}>次へ進む</button>
      </div>
    );
  }
}
