import React from 'react'
import {List, InputItem,NavBar} from 'antd-mobile'
import io from 'socket.io-client'
import {connect} from 'react-redux'
import {getMsgList,sendMsg,recvMsg} from '../../redux/chat.redux'

const socket = io('ws://localhost:9093')
@connect(
  state=>state,
  {getMsgList,sendMsg,recvMsg}
)
class Chat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      msg: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit() {
    // socket.emit('sendmsg', {text: this.state.text})
    const from =this.props.user._id;
    const to=this.props.match.params.user
    const msg=this.state.text
    this.props.sendMsg({from,to,msg})
    this.setState({text:''})
  }
  componentDidMount() {
  }
  render() {
    const user=this.props.match.params.user
    const Item=List.Item
    return (
      <div id="chat-page">
      <NavBar mode='dar'>
        {this.props.match.params.user}
      </NavBar>
      {
        this.props.chat.chatmsg.map(v => {
          console.log('22',v,user)
          return v.form===user?(
            <List key={v._id}
              >
              <Item>{v.content}</Item>
            </List>
          ):(
            <List key={v._id}
              >
              <Item
                extra={'avatar'}
                 className='chat-me'>{v.content}</Item>
            </List>
          )
        })
      }
      <div className="stick-footer">
        <List>
          <InputItem placeholder="請輸入" value={this.state.text} onChange={v => {
              this.setState({text: v})
            }} extra={<span onClick = {
              () => this.handleSubmit()
            } > 發送</span>}></InputItem>
        </List>
      </div>
    </div>)
  }
}

export default Chat;
