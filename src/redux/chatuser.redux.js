// @flow
import axios from 'axios'
const USER_LIST = 'USER_LIST'
const initState={
  userlist:[],
}

export function chatuser(state:{userlist:Array<any>}=initState,action:Object){
  switch(action.type){
    case USER_LIST:
      return {
        ...state,
        userlist:action.payload
      }
      default:
        return state
  }
}
function userList(data){
  return {
    type:USER_LIST,
    payload:data
  }
}
export function getUserList(type:string){
  return (dispatch:Function)=>{
    axios.get('/user/list?type='+type)
      .then(res=>{
        if(res.status===200){
          // this.setState({data:res.data})
          dispatch(userList(res.data))
        }
      })
  }
}
