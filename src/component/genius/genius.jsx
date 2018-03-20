import React,{Component} from 'react'
import {getUserList} from '../../redux/chatuser.redux'
import {connect} from 'react-redux'
import UserCard from '../userinfo/userinfo.jsx'

@connect(
  state => ({ user: state.get("user"), chatuser: state.get("chatuser") }),
  {
    getUserList
  }
)
class Genius extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    this.props.getUserList("boss");
  }
  render() {
    let userid = this.props.user.get("_id");
    const userlist = this.props.chatuser.get("userlist").filter(v => {
      return v._id !== userid;
    });
    return <UserCard userlist={userlist} />;
  }
}
export default Genius
