import React from 'react';
import ReactDom from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom'
import './index.css'
import Login from './container/login/login.jsx'
import Register from './container/register/register.jsx'
import AuthRoute from './component/authroute/authroute.jsx'
import BossInfo from './container/bossinfo/bossinfo.jsx'
import GeniusInfo from './container/geniusinfo/geniusinfo.jsx'
import Dashboard from './component/dashboard/dashboard.jsx'
import User from './component/user/user.jsx'
import Chat from './component/chat/chat.jsx'
import reducers from './reducer';
import './config'
import { createStore, applyMiddleware, compose } from 'redux'
const store = createStore(
  reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
)
ReactDom.render(
  (
  <Provider store={store}>
    <BrowserRouter>
    <div>
    <AuthRoute></AuthRoute>
    <Switch>
      <Route path='/geniusinfo' component={GeniusInfo}></Route>
      <Route path='/bossinfo' component={BossInfo}></Route>
      <Route path='/login' component={Login}></Route>
      <Route path='/user' component={User}></Route>
      <Route path='/register' component={Register}></Route>
      <Route path='/chat/:user'component={Chat}></Route>
      <Route component={Dashboard}></Route>
    </Switch>
    </div>
    </BrowserRouter>
  </Provider>), document.getElementById('root')
)
