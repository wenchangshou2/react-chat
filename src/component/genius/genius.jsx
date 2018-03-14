import React,{Component} from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../userinfo/userinfo.jsx'

@connect(state=>state.chatuser,
  {
    getUserList
  }
)
class Genius extends Component{
  constructor(props){
    super(props)
    this.state={
      data:[]
    }
  }
  componentDidMount(){
    this.props.getUserList('boss')
  }
  render(){
    return (
        <UserCard userlist={this.props.userlist}></UserCard>

    )
  }
}
export default Genius
