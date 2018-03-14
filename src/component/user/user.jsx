import React from 'react'
import {connect} from 'react-redux'
import {Result, List, Modal, WhiteSpace} from 'antd-mobile'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
const cookies = require('browser-cookies')
@connect(state => state.user,{
  logoutSubmit
})
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
    this.state = {}

  }

  logout(e) {
    // cookies.erase('userid')
    const alert = Modal.alert;
    alert('注销','确认退出吗？',[
      {text:'取消',onPress:()=>{}},
      {text:'确认',onPress:()=>{
        cookies.erase('userid')
        this.props.logoutSubmit()

      }},
    ])
  }
  handleClickOnTitle() {
    console.log('Click on title.')
  }
  render() {
    const Item = List.Item
    const props = this.props
    const Brief = Item.Brief

    return props.user
      ? (
      <div>
        <Result img={<img src = {
            require(`../img/${this.props.avatar}.png`)
          }
          style = {{width:50}}alt = "" />} title={this.props.user} message={this.props.type === 'boss'
            ? this.props.company
            : null}/>
        <List renderHeader={() => '简介'} platform="cross">
          <Item multipleLine={true}>
            {props.title}
            {props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {
              props.money
                ? <Brief >薪资:{props.money}</Brief>
                : null
            }

          </Item>

        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>)
      : <Redirect to={props.redirectTo}/>
  }

}
export default User
