/**
 * Created by Administrator on 2019/10/16.
 */
import React from 'react'
import Store from '../store/index.js'
import '../assion/css/collect.css'
import Na from './navs2.js'
class Collect extends React.Component{
    constructor(props){
        super(props);
        this.state={
            arr:Store.state.arr,
        };
        this.re=this.re.bind(this)
    }
render(){
return(
    <div>
        <div className="coll">
            <span className='iconfont icon-quanbu2' onClick={this.re}></span>
            <h5>{this.state.arr.length}条收藏</h5>
        </div>
        <ul className="collUl">
            {
            (()=>{
          if(this.state.arr.length>0){
              {console.log(this.state.arr[0])}
             return this.state.arr.map((val,index)=>{
                  return <li key={index} onClick={this.go.bind(this,index)}>
                      <h6>{val.title}</h6>
                      <div><img src={val.src}/></div>
                  </li>
              })
              }
            })()
            }
        </ul>
        <Na pro={this.props}></Na>
    </div>
    )
}
componentDidMount(){
}
go(x){

    this.props.history.push({
        pathname:'/details',
        state:{id:this.state.arr[x].id}
    })
}
re(){
    Store.dispatcher.dispatch({
        Type:'b',
        open:true
    })
}
}

export default Collect