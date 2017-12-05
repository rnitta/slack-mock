import ActionCable from "actioncable"

let domain = location.pathname.split('/')[2]
if (localStorage.getItem(domain) == null) {
  alert('エラー')
}
const App = {}
App.cable = ActionCable.createConsumer(`ws://localhost:3000/cable?token=${localStorage.getItem(domain).token}`)

export default App
