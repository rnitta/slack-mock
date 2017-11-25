import React from 'react'

export default class EmailRegistration extends React.Component {
  constructor(props) {
    super(props)
    // stateの初期値を設定
    this.state = {
      user_name: "",
      display_name: "",
      check_user: false,
      check_display: true,
      isdisabled: true
    }
  }
  updateState(e) {
    e.preventDefault()
    if (!this.state.check_user || !this.state.check_display) {
      return false
    }
    // 表示名が空だった場合ユーザー名を使用
    var display_name = this.state.display_name
    var user_name = this.state.user_name
    if (this.state.display_name === "") {
      display_name = user_name
    }
    // Parentのステートを更新
    this.props.updateName({user_name: user_name, display_name: display_name})
  }
  validate_user_name(e) {
    // ユーザー名が有効か検証(空白・文字数)
    if (!!e.target.value && e.target.value.length > 2 && e.target.value.length < 51) {
      this.setState({user_name: e.target.value, check_user: true})
    } else {
      this.setState({check_user: false})
    }
    this.switch_button_validity()
  }
  validate_display_name(e) {
    // 表示名が有効か検証(文字数)
    if (e.target.value.length < 51) {
      this.setState({display_name: e.target.value, check_display: true})
    } else {
      this.setState({check_display: false})
    }
    this.switch_button_validity()
  }
  switch_button_validity() {
    //ボタンを有効化
    if (this.state.check_user && this.state.check_display) {
      this.setState({isdisabled: false})
    } else {
      this.setState({isdisabled: true})
    }
  }
  render() {
    return (
      <form id="name_form" style={this.props.style}>
        <input type="text" placeholder="ユーザ名" id="user_name_input" autoComplete="off" onChange={(e) => this.validate_user_name(e)}/>
        <input type="text" placeholder="表示名" id="display_name_input" autoComplete="off" onChange={(e) => this.validate_display_name(e)}/>
        <button id="submit_btn" disabled={this.state.isdisabled} onClick={this.updateState.bind(this)}>Enter</button>
      </form>
    );
  }
}
