import React from 'react'
import {NavBar, InputItem, TextareaItem, Button} from 'antd-mobile'
import AvatarSelector from '../../component/avatar-selector/auatar-selector.jsx'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'

@connect(state => ({user:state.user}), {update})
class BossInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      avatar: '',
      desc:'',
      company:'',
      money:''
    }
  }
  onChange(key, val) {
    this.setState({[key]: val})
  }
  render() {
    const path = this.props.location.pathname
    const redirect = this.props.user.get('redirectTo')
    return (<div>
      {
        redirect&&redirect!==path
          ? <Redirect to={redirect}/>
          : null
      }
      <NavBar mode="dark">
        BOSS完善信息页面
      </NavBar>
      <AvatarSelector selectAvatar={(imgname) => {
          this.setState({avatar: imgname})
        }}></AvatarSelector>
      <InputItem onChange={(v) => this.onChange('title', v)}>招聘职位</InputItem>
      <InputItem onChange={(v) => this.onChange('company', v)}>公司名称</InputItem>
      <InputItem onChange={(v) => this.onChange('money', v)}>职位薪资</InputItem>
      <TextareaItem rows={3} autoHeight="autoHeight" title='职位要求' onChange={(v) => this.onChange('desc', v)}>职位要求</TextareaItem>
      <Button type='primary' onClick={() => {
          this.props.update(this.state)
        }}>保存</Button>
    </div>)
  }
}
export default BossInfo
