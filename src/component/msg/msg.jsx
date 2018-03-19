import React,{Component} from 'react'
import {List,Badge} from 'antd-mobile'
import {connect} from 'react-redux'
@connect(
    state => ({ chat: state.get('chat'), user: state.get('user') }),
    {}
)
class Msg extends Component {
    getLast(arr){
        return arr[arr.length - 1]
    }
    render() {
        const userid = this.props.user.get('_id')
        const Item = List.Item
        const Brief = Item.Brief
        const msgGroup = {}
        this.props.chat.get('chatmsg').forEach(element => {
            msgGroup[element.chatid]=msgGroup[element.chatid]||[]
            msgGroup[element.chatid].push(element)
        });
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last=this.getLast(a).create_time
            const b_last=this.getLast(b).create_time
            console.log('0',a_last,b_last)
            return b_last-a_last
        })
        return (
            <div>
                <List>
                    {chatList.map(v=>{
                        const lastItem = this.getLast(v)
                        const targetId = v[0].from === userid ? v[0].to : v[0].from
                        const unreadNum =v.filter(v=>!v.read&&v.to===userid).length
                        if(!targetId){
                            return
                        }
                        let userinfo = this.props.chat.get('users').get(targetId)
                        console.log('userinfo',userinfo)
                        const name=userinfo&&userinfo.name
                        const avatar = userinfo && userinfo.avatar
                        return <Item 
                        extra={<Badge text={unreadNum}></Badge>}
                        thumb={require(`../img/${avatar}.png`)}
                        arrow="horizontal"
                        onClick={()=>{
                            this.props.history.push(`/chat/${targetId}`)
                        }}
                        >
                        {lastItem.content}
                        <Brief>{name}</Brief>
                            </Item>
                    })}
                </List>
            </div>
        )
    }
}
export default Msg