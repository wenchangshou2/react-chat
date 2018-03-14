import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {WingBlank,WhiteSpace,Card} from 'antd-mobile'
class UserCard extends Component{
  static propTypes={
    userlist:PropTypes.array.isRequired
  }
  render(){
    const Header=Card.Header
    const Body=Card.Body
    return (
      <WingBlank>
        <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(v=>{
          console.log(v,v.avatar);
          return v.avatar?(<Card
              key={v.user}
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
              {v.type==='boss'?<div> 薪资:{v.money}</div>:null}
            </Body>
          </Card>):null
        }
        )}
      </WingBlank>

    )
  }
}
export default UserCard
