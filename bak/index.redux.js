const ONE='ONE';
const TWO='TWO'
export function counter(state=0,action){
  switch(action.type){
    case ONE:
      return state+1;
    case TWO:
      return state+2;
    default:
      return 10;
  }
}
export function addOne(){
  console.log('ff')
  return {type:ONE};
}

export function addTwo(){
  return {type:TWO};
}
export function addOneAsync(){
  console.log('1')
  return dispatch=>{
    setTimeout(()=>{
      dispatch(addOne())
    },2000)
  }
}
