import React from 'react'

export default class DisplayInfos extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentDidMount() {
    axios.defaults.headers['X-CSRF-TOKEN'] = this.props.state.csrf_token
    axios.post('/invitation/data', {jwt: this.props.state.jwt}).then((results) => {
      if (results.data.success) {
        delete(results.data.success)
        this.props.update_state(results.data)
      }
    },).catch(() => {
      alert('エラー')
    })
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
      </div>
    );
  }
}
