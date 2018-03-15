import React from 'react';
import {Link,Route} from 'react-router-dom';
import App from './App'
function Yiyin(){
  return <h2>一营</h2>
}
function Qibingliang(){
  return <h2>骑兵连</h2>
}
class DashBoard extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to='/dashboard'>一营</Link>
          </li>
          <li>
            <Link to='/dashboard/erying'>一营</Link>
          </li>
          <li>
            <Link to='/dashboard/qibinglian'>一营</Link>
          </li>
        </ul>
        <Route exact path='/dashboard/' component={App}></Route>
        <Route path='/dashboard/erying' component={Yiyin}></Route>
        <Route path='/dashboard/qibinglian' component={Qibingliang}></Route>
      </div>
    )
  }
}
export default DashBoard;
