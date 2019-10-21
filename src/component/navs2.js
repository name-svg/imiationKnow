/**
 * Created by Administrator on 2019/10/16.
 */
import React from 'react'
import '../assion/css/navs.css'
import Store from '../store/index.js'
import a from '../assion/img/timg.jpg'
import { Drawer, List, NavBar, Icon } from 'antd-mobile';

class Na extends React.Component {
    constructor(props){
        super(props);
        this.state={
            open:Store.state.open,
        };
        this.ind=this.ind.bind(this);
        this.col=this.col.bind(this)
    }
    onOpenChange = (...args) => {
        document.body.style.overflow='';
        Store.dispatcher.dispatch({
            Type:'b',
            open:false
        });
    };
    render(props) {
        const sidebar = (

        <div style={{width:'3rem'}}>
                <div className="Top">
                    <div className="head" onClick={this.collect} style={{width:'100%'}}>
                        <span><img src={a} style={{width:'0.4rem',height:'0.4rem'}}/></span><i>阿里路亚</i>
                    </div>
                    <ul className="oul clearfloat" style={{paddingBottom:'0.1rem'}}>
                        <li onClick={this.col}><span className="iconfont icon-shoucang-on"></span>我的收藏</li>
                        <li><span className="iconfont icon-xiazai2"></span>离线下载</li>
                    </ul>
                    <div className="ind" style={{marginTop:0}}onClick={this.ind} ><span className="iconfont icon-shouye"></span><b>首页</b></div>
                </div>
        </div>
        );

        return (<div>
            <Drawer
                className="my-drawer"
                enableDragHandle
                contentStyle={{ }}
                sidebar={sidebar}
                open={this.state.open}
                onOpenChange={this.onOpenChange}
                sidebarStyle={{position:'fixed',height:'100%',left:0,top:0,zIndex:999}}
                overlayStyle={{position:'fixed',height:'100%',left:0,top:0}}
                dragHandleStyle={{border:'none',width:0}}
                style={{width:0}}
            >
             &nbsp;
            </Drawer>
        </div>);
    }
componentDidMount(){
    Store.state.on('b',()=>{
        this.setState({
            open:Store.state.open
        })
    })
}
col(){
    this.props.pro.history.push({
        pathname:'/collect'
    })
    Store.dispatcher.dispatch({
        Type:'b',
        open:false
    });
};
ind(){
    this.props.pro.history.push({
        pathname:'/index'
    });
    Store.dispatcher.dispatch({
        Type:'b',
        open:false
    });
}
}

export default Na
