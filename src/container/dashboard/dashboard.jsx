import React, {Component} from 'react'
import {NavBar } from 'antd-mobile'
import NavLinkBar from '../../component/navlink/navlink.jsx'
import {connect} from 'react-redux'
import {Switch, Route} from 'react-router-dom'
import Boss from '../../component/boss/boss.jsx'
import Genius from '../../component/genius/genius.jsx'
import User from '../../component/user/user.jsx'
import {getMsgList,recvMsg} from '../../redux/chat.redux'
function Msg(){
  return (
    <div>msg</div>
  )
}
@connect(state => ({ user: state.get('user') }), {
  getMsgList,recvMsg
})
class Dashboard extends Component {
  componentDidMount(){
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render() {
    const {pathname} = this.props.location
    const user = this.props.user
    const {type} =user.toJS()
    const navList = [
      {
        path: '/boss',
        text: '牛人',
        icon: 'boss',
        title: '牛人列表',
        component: Boss,
        hide: type === 'genius'
      }, {
        path: '/genius',
        text: 'BOSS',
        icon: 'job',
        title: 'boss列表',
        component: Genius,
        hide: type === 'boss'
      }, {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      }, {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    console.log('pathname', pathname)
    return (<div>
      <NavBar className='fixd-header' mode='dard'>{
          navList.find(v => v.path === pathname)
          ? navList.find(v  => v.path === pathname).title
          : null
        }</NavBar>
        <div style={{
            marginTop: 45
          }}>
          <Switch>
            {navList.map(v => (<Route key={v.path} path={v.path} component={v.component}></Route>))}
          </Switch>
        </div>

        <NavLinkBar data={navList}></NavLinkBar>
      </div>)
    }
  }
  export default Dashboard
