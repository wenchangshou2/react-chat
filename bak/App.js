import React from 'react';
import {connect} from 'react-redux';
import {addOne,addTwo,addOneAsync} from './index.redux';
 function mapStateToProps(state){
   console.log('state',state)
  return {num:state}
}
const actionCreators={addOne,addTwo,addOneAsync}
// import {addOne,addTwo,addOneAsync}
@connect(
  state=>({num:state.counter}),
  {addOne,addTwo,addOneAsync}
)
class App extends React.Component{
  // constructor(props){
  //   super(props);
  // }
  render(){
    console.log(this.props)
    const store=this.props.store;
    // const num=store.getState();
    const num=this.props.num
    const addOne=this.props.addOne
    const addTwo=this.props.addTwo
    const addOneAsync=this.props.addOneAsync

    return (
      <div>
      <h1>现在有数字{num}</h1>
      <button onClick={()=>{
        addOne()
      }}>添加</button>
      <button onClick={()=>{
        addTwo()
      }}>添加2</button>
      <button onClick={addOneAsync}>异步执行</button>
      </div>
    )
  }
}
// App=connect(mapStateToProps,actionCreators)(App)
export default App;
