import React from 'react';
import Logo from '../../component/logo/logo.jsx'
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(state =>  ({user: state.get('user')}) , { login })
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pwd: ''
    }
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  handleLogin() {
    this.props.login(this.state)
  }
  register() {
    this.props.history.push('/register')
  }
  handleChange(key, val) {
    this.setState({[key]: val})
  }
  render() {
    const user=this.props.user
    const {redirectTo,msg}=user.toJS()
    return (<div>
      {
        redirectTo&&redirectTo!=='/login'
          ? <Redirect to={redirectTo}/>
          : null
      }
      <Logo></Logo>
      <h2>我是登录页</h2>
      <WingBlank>
        <List>
          {
            msg
              ? <p className="error-msg">{msg}</p>
              : null
          }
          <InputItem onChange={v => this.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace/>
          <InputItem type='password' onChange={v => this.handleChange('pwd', v)}>密码</InputItem>
        </List>
        <Button type='primary' onClick={this.handleLogin}>登录</Button>
        <WhiteSpace/>
        <Button onClick={this.register} type='primary'>注册</Button>
      </WingBlank>
    </div>)
  }
}
export default Login;
