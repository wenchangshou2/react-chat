// @flow
import axios from 'axios'
import io from 'socket.io-client'
import { List, Map } from 'immutable';
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'

const MSG_RECV = 'MSG_RECV'

const MSG_READ = 'MSG_READ'
const initState = Map({
  chatmsg: List(),
  unread: 0,
  users:Map({})
})

export function chat(state = initState, action) {
  switch (action.type) {
    case MSG_LIST:
    console.log(1,action.payload)
      return state.merge(
        {
          chatmsg:List(action.payload.msgs),
          unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
          users: Map(action.payload.users)
        }
      )
      // return state.merge({ chatmsg: List(action.payload), unread: action.payload.filter(v => !v.read).length })
    case MSG_RECV:
      return state.merge({ chatmsg: state.get('chatmsg').concat(action.payload), unread: state.get('unread') + 1 })
    default:
      return state
  }
}

function msgList(msgs,users,userid) {
  return {
    type: 'MSG_LIST',
    payload: {msgs,users,userid},
  }
}
function msgRecv(msg,userid){
  return {userid,type:MSG_RECV,payload:msg}
}
function msgRead({ from, userid, num }) {
  return { type: MSG_READ, payload: { from, userid, num } }
}
export function readMsg(from){
  return (dispatch, getState) => {
    axios.post('/user/readmsg',{from})
      .then(res=>{
        const userid=getState().get('user').get('_id')
        if(res.status===200 && res.data.code===0){
          dispatch(msgRead(msgRead({ userid, from,num:res.data.num  })))
        }
      })
  }
}
export function recvMsg(){
  return (dispatch,getState)=>{
    socket.on('recvmsg',function(data){
      let userid=getState().get('user').get('_id')
      dispatch(msgRecv(data,userid))
    })
  }
}
'use strict'
export function sendMsg({ from, to, msg }) {
  return (dispatch) => {
    socket.emit('sendmsg', { from, to, msg })
  }
}
export function getMsgList() {
  return (dispatch,getState) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          console.log('getstate',getState())
          const userid=getState().get('user').get('._id')
          dispatch(msgList(res.data.msgs,res.data.users,userid))
        }
      })
  }
}
