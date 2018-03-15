// @flow
import axios from 'axios'
import {
  getRedirectPath
} from '../util'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT='LOGOUT'
const initState = {
  redirectTo: '',
  msg: '',
  user: '',
  type: ''
}
export function loadData(userinfo:any) {
  console.log('loadData2',userinfo)
  return {
    type: AUTH_SUCCESS,
    payload: userinfo
  }
}
export function logoutSubmit(){
  return {type:LOGOUT}
}
export function update(data:any) {
  return (dispatch:any) => {
    axios.post('/user/update', data)
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
//reducer
export function user(state:any = initState, action:any) {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state,
        msg: '',
        redirectTo: getRedirectPath(action.payload),
        isAuth: true,
        ...action.payload,
        pwd: ''
      }
      case LOGOUT:
          return {...initState,redirectTo:'/login'}
    case ERROR_MSG:
      return { ...state,
        isAuth: false,
        msg: action.msg,
      }
    default:
      return state
  }
}
export function login({
  user,
  pwd
}:{user:string,pwd:string}) {
  if (!user || !pwd) {
    return errorMsg('用户名和密码必须输入')
  }
  return (dispatch:Function) => {
    axios.post('/user/login', {
        user,
        pwd,
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}


function authSuccess(obj) {
  const {
    pwd,
    ...data
  } = obj
  return {
    type: AUTH_SUCCESS,
    payload: data
  }
}


function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
}
export function register({
  user,
  pwd,
  repeatpwd,
  type
}:{user:string,pwd:string,repeatpwd:string,type:string}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同')
  }
  return (dispatch:Function) => {
    axios.post('/user/register', {
        user,
        pwd,
        type
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(authSuccess(user, pwd, type))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })

  }
}
