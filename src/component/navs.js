/**
 * Created by Administrator on 2019/10/16.
 */
import React from 'react'
import '../assion/css/navs.css'
import a from '../assion/img/timg.jpg'
import "animate.css"
import Store from '../store/index.js'
class Navs extends React.Component{
    constructor(props){
        super(props);
        this.state={
        };
        this.ind=this.ind.bind(this)
    }
    render(props){
        return(
        <div>
            <div className="leftNav" style={{left:this.state.left+'rem'}}>
                <div className="Top">
                    <div className="head">
                        <span><img src={a}/></span><i>阿里路亚</i>
                    </div>
                    <ul className="oul clearfloat" >
                        <li onClick={this.collect.bind(this)}><span className="iconfont icon-shoucang-on"></span>我的收藏</li>
                        <li><span className="iconfont icon-xiazai2"></span>离线下载</li>
                    </ul>
                    <div className="ind" onClick={this.ind}><span className="iconfont icon-shouye"></span><b>首页</b></div>
                </div>
            </div>
        </div>
        )
    }
    componentDidMount(){
    }
    componentDidUpdate(){
    }
    componentWillReceiveProps(){

    }
    collect(){
        this.props.pro.history.push('/collect')
    }
    ind(){
        this.props.re()
    }

}

export default Navs
