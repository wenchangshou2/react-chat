// @flow
import axios from 'axios'
import { Map, List } from 'immutable';
const USER_LIST = 'USER_LIST'
const initState = Map({
  userlist: List([]),
})

export function chatuser(state = initState, action) {
  switch (action.type) {
    case USER_LIST:
      return state.merge(
        state.set('userlist', List(action.payload))
      )
    default:
      return state
  }
}
function userList(data) {
  return {
    type: USER_LIST,
    payload: data
  }
}
export function getUserList(type) {
  return (dispatch) => {
    axios.get('/user/list?type=' + type)
      .then(res => {
        if (res.status === 200) {
          // this.setState({data:res.data})
          dispatch(userList(res.data))
        }
      })
  }
}
