import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends Component{
  constructor(props){
    super(props)
    this.handleClick=this.handleClick.bind(this)
  }
  handleClick(v){
    console.log(this.props)
    this.props.history.push(`/chat/${v._id}`)
  }
  render(){
    const Header=Card.Header
    const Body=Card.Body
    console.log('userlist',this.props.userlist.toObject())
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v=>{
          console.log(v,v.avatar);
          return v.avatar?(<Card
              key={v.user}
              onClick={()=>this.handleClick(v)}
          >
            <Header
              title={v.user}
              thumb={require(`../img/${v.avatar}.png`)}
              extra={<span>{v.title}</span>}
              >
            </Header>
            <Body>
              {v.type==='boss'?<div>公司:{v.company}</div>:null}
              {v.desc.split('\n').map(d=>(
                <div key={d}>{d}</div>
              ))}
              {v.type==='boss'&&v.money?<div> 薪资:{v.money}</div>:null}
            </Body>
          </Card>):null
        }
        )}
      </WingBlank>

    )
  }
}
export default UserCard
