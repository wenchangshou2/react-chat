// @flow
import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')

const MSG_LIST = 'MSG_LIST'

const MSG_RECV = 'MSG_RECV'

const MSG_READ = 'MSG_READ'

const initState = {
  chatmsg: [],
  unread: 0,
}

export function chat(state:Object = initState, action:Object) {
  switch (action.type) {
    case MSG_LIST:
      return { ...state,
        chatmsg: action.payload,
        unread: action.payload.filter(v => !v.read).length
      }
    case MSG_RECV:
      return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+1}
    // case MSG_READ:
    default:
      return state
  }
}

function msgList(msgs) {
  return {
    type: 'MSG_LIST',
    payload: msgs
  }
}
function msgRecv(msg){
  return {type:MSG_RECV,payload:msg}
}
export function recvMsg(){
  return (dispatch:Function)=>{
    socket.on('recvmsg',function(data){
      console.log('recvmsg',data);
      dispatch(msgRecv(data))
    })
  }
}
'use strict'
export function sendMsg({from,to,msg}:{from:string,to:string,msg:string}){
  return (dispatch:Function)=>{
    socket.emit('sendmsg',{from,to,msg})
  }
}
export function getMsgList() {
  return (dispatch:Function) => {
    axios.get('/user/getmsglist')
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          dispatch(msgList(res.data.msgs))
        }
      })
  }
}
