import React,{Component} from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'

import UserCard from '../userinfo/userinfo.jsx'
@connect(state => ({ chatuser: state.get('chatuser') }),
  {
      getUserList
  }
)
class Boss extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    this.props.getUserList('genius')
  }
  render(){
    return (
      <UserCard userlist={this.props.chatuser.get('userlist')}></UserCard>
    )
  }
}
export default Boss
