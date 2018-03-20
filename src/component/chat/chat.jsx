import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util';
  require('./chat.css')

const socket = io('ws://localhost:9093')
@connect(
  state => ({ chat: state.get('chat'), user: state.get('user') }),
  { getMsgList, sendMsg, recvMsg, readMsg }
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: [],
      showEmoji: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    console.log('user',this.props.user.toJS())
    if (!this.props.chat.get('chatmsg').size) {
      this.props.getMsgList()
      this.props.recvMsg()
    }
    const to = this.props.match.params.user
    this.props.readMsg(to)
  }
  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text})
    console.log('user2',this.props.user.toJS())
    const from = this.props.user.get('_id')
    const to = this.props.match.params.user
    const msg = this.state.text
    console.log('sendmsg',from,to,msg,this.props.user.toJS())
    this.props.sendMsg({ from, to, msg })
    this.setState({ text: '', showEmoji: false })
  }
  fixCarousel() {
    setTimeout(function () {
      window.dispatchEvent(new Event('resize'))
    }, 0)

  }
  render() {
    const emoji = '😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
      .split(' ')
      .filter(v => v)
      .map(v => ({ text: v }))
    const userid= this.props.match.params.user
    const Item = List.Item
    const chat = this.props.chat
    const users = chat.get('users')
    if (!users.get(userid)) {
      return null
    }
    const chatid = getChatId(userid, this.props.user.get('_id'))
    const chatmsgs = chat.get('chatmsg')

    return <div id="chat-page">
        <NavBar mode="dar" icon={<Icon type="left" />} onLeftClick={() => {
            this.props.history.goBack();
          }}>
          {users.get(userid)["name"]}
        </NavBar>
        <div>
          {
          chat.get('chatmsg').map(v => {
            const avatar = require(`../img/${users.get(v.from).avatar}.png`)
            return v.form === userid ? (
              <List key={v._id}
              >
                <Item>{v.content}</Item>
              </List>
            ) : (
                <List key={v._id}
                >
                  <Item
                    thumb={avatar}
                  >{v.content}</Item>
                </List>
              )
          })
          }
        </div>
        <div className="stick-footer">
          <List>
            <InputItem placeholder="請輸入" value={this.state.text} onChange={v => {
                this.setState({ text: v });
              }} extra={<div>
                  <span style={{ marginRight: 15 }} onClick={() => {
                      this.setState({ showEmoji: !this.state.showEmoji });
                      this.fixCarousel();
                    }}>
                    😄{" "}
                  </span>
                  <span onClick={() => this.handleSubmit()}> 发送</span>
                </div>} />
          </List>
          {this.state.showEmoji ? <Grid data={emoji} columnNum={9} carouselMaxRow={4} isCarousel={true} onClick={el => {
                this.setState({ text: this.state.text + el.text });
              }} /> : null}
        </div>
      </div>;
  }
}

export default Chat;
