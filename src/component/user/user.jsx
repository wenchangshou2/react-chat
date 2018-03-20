import React from 'react'
import {connect} from 'react-redux'
import {Result, List, Modal, WhiteSpace} from 'antd-mobile'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
const cookies = require('browser-cookies')
@connect(state => ({user:state.get('user')}),{
  logoutSubmit
})
class User extends React.Component {
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
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
    const { redirectTo,money,title,desc,avatar, user, type, company } = this.props.user.toJS()
    return user
      ? (
      <div>
        <Result img={<img src = {
            require(`../img/${avatar}.png`)
          }
          style = {{width:50}}alt = "" />} title={user} message={type === 'boss'
            ? company
            : null}/>
        <List renderHeader={() => '简介'} platform="cross">
          <Item multipleLine={true}>
            {title}
            {desc.split('\n').map(v => <Brief key={v}>{v}</Brief>)}
            {
              money
                ? <Brief >薪资:{money}</Brief>
                : null
            }

          </Item>

        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Item onClick={this.logout}>退出登录</Item>
        </List>
      </div>)
      : <Redirect to={redirectTo}/>
  }

}
export default User
