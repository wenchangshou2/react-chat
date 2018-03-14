import React from 'react';
import {connect} from 'react-redux';
import {addOne,addTwo,addOneAsync} from './index.redux';
 function mapStateToProps(state){
   console.log('state',state)
  return {num:state}
}
const actionCreators={addOne,addTwo,addOneAsync}
// import {addOne,addTwo,addOneAsync}
@connect(mapStateToProps,actionCreators)
class Music extends React.Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
    const store=this.props.store;
    // const num=store.getState();
    const num=this.props.num
    const addOne=this.props.addOne
    const addTwo=this.props.addTwo
    const addOneAsync=this.props.addOneAsync
    console.log('11',this.props.match.params.id);


    return (
      <div>
        <h1>音乐界面</h1>
        {this.props.match.params.id}
      </div>
    )
  }
}
// App=connect(mapStateToProps,actionCreators)(App)
export default Music;
