import React, {Component} from 'react'
import {Grid,List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends Component {
  static propTypes={
    selectAvatar:PropTypes.func
  }
  constructor(props){
    super(props)
    this.state={
      text:''
    }
  }
  render() {
    const avatarList = 'woman,man,boy,girl,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale'.split(',').map(v => ({
      icon: require(`../img/${v}.png`),
      text: v
    }))
    const gridHeader = this.state.text
      ? (<div>
        <span>已选择头像
        </span>
        <img style={{width:20}} src={this.state.icon} alt=""/>
    </div>):'请选择头像'
    return (<div>
      <List renderHeader={()=>gridHeader}>
      </List>
      <Grid onClick={elm => {
          this.setState(elm)
          this.props.selectAvatar(elm.text)
        }} data={avatarList} columnNum={5} activeStyle={false}/>
    </div>)
  }
}
export default AvatarSelector
