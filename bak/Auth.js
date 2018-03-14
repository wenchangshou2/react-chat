import React from 'react';
import { connect } from 'react-redux'
import { login,getUserData } from './Auth.redux'
import {Redirect}　from 'react-router-dom';
import axios from 'axios';
@connect(
  state => state.auth,
  {login,getUserData}
)
class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      data:{
        name:'',
        age:10
      }
    }
  }
  componentDidMount(){
    this.props.getUserData()
  }
  render() {
    console.log('1',this.props)
    return (
      <div>
        你的名字:{this.props.user}，你的年龄{this.props.age}
        {this.props.isAuth ? <Redirect to='/dashboard' /> : null}
        <h2>你没有权限，需要登录才能看</h2>
        <button onClick={this.props.login}>登录</button>
      </div>
    )
  }
}
export default Auth;
