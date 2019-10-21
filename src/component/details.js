/**
 * Created by Administrator on 2019/10/15.
 */
import React from 'react'
import axios from 'axios'
import Store from '../store/index.js'
import '../assion/css/details.css'
class Details extends React.Component{
    constructor(props){
        super(props);
        this.state={
            details:{},
            css:'',
            // src:'',
            topSrc:'',
            flag:false,
            comments:'',
            popularity:'',
            pop:false,
            coll:false,
            num:'',
            arr:[],
            sleep:0.05,
            num2:0,
            ico:[
                {
                    color:'#f13f19',
                    class:'iconfont icon-weibo',
                    title:'新浪微博'
                },
                {
                    color:'#60c84f',
                    class:'iconfont icon-weixin',
                    title:'微信'
                },
                {
                    color:'#72cf29',
                    class:'iconfont icon-weixinpengyouquan',
                    title:'微信朋友圈'
                },
                {
                    color:'#5ab540',
                    class:'iconfont icon-fenxiang_yinxiangbiji',
                    title:'印象笔记'
                },
                {
                    color:'#30a1ed',
                    class:'iconfont icon-youdaoyunbiji',
                    title:'有道云笔记'
                },
                {
                    color:'#2369c8',
                    class:'iconfont icon-Fill',
                    title:'QQ'
                },
                {
                    color:'#7f7f7f',
                    class:'iconfont icon-gengduo',
                    title:'更多平台'
                },
            ],
            opacity:1
        }
    }
    render(){
        let imgg = document.getElementsByClassName('img-place-holder');
        if(imgg[0] !==undefined){
            imgg[0].innerHTML=`<img src=${this.state.topSrc}><p>${this.state.details.title}</p><div></div>`
        }
        return(
            <div>
                <div className="top" ref='top' style={{opacity:this.state.opacity}}>
                    <span className="return iconfont icon-fanhuijiantou1" onClick={this.com.bind(this)}></span>
                    <span className="four iconfont icon-dianzan" onClick={this.pop.bind(this)} ref="pop"><b>{
                        ((a,b,c)=>{
                            if(c===true){
                                return a
                            }else{
                                return b
                            }
                        })(this.state.num,this.state.popularity,this.state.pop)
                    }</b></span>
                    <span className="three iconfont icon-pinglun" onClick={this.word.bind(this)}><b>{this.state.comments}</b></span>
                    <span className="two iconfont icon-shoucang" onClick={this.collect.bind(this)} ref='collect'></span>
                    <span className="one iconfont icon-fenxiang2" onClick={this.ar.bind(this)} ></span>
                </div>
                <div className="cover" ref="cover"  onClick={this.van.bind(this)}>
                    <dl>
                        <dt>分享</dt>
                        {
                            this.state.ico.map((val,index)=>{
                              return <dd key={index}>
                                  <div style={{background:val.color}}>
                                      <span className={val.class} style={{color:'#fff'}}></span>
                                  </div>
                                  <h6>{val.title}</h6>
                              </dd>
                            })
                        }
                    </dl>
                </div>
                {/*<div className='bigImg'><img src={this.state.src}/></div>*/}
                <div dangerouslySetInnerHTML={{__html:this.state.details.body}}>
                </div>
                <style>{this.state.css}</style>
            </div>
        )
    }
    componentDidMount(){
        window.addEventListener('scroll',this.down);
        if(Store.state.arr !=''){
            Store.state.arr.map((val,index)=>{
                if(val.id==this.props.location.state.id){
                    this.state.coll=true;
                    this.setState({
                        coll:this.state.coll
                    })
                }
            });
        }
        axios.get(
            '/api/4/news/'+this.props.location.state.id)
            .then((res)=>{
                this.state.details=res.data;
                this.state.topSrc=res.data.image;
                let a =res.data.css[0].replace('http://news-at.zhihu.com','');
            this.state.src=res.data.image;
            axios.get(a).then((res)=>{
                this.state.css=res.data;
                this.setState({
                    css:this.state.css,

                })
            });
            this.setState({
               details:this.state.details,
                src:this.state.src,
                topSrc:this.state.topSrc,
                title:this.state.details.title
            })
        });
        axios.get('/api/4/story-extra/'+this.props.location.state.id).then((res)=>{
            this.setState({
                comments:res.data.comments,
                popularity:res.data.popularity
            })
        });
    }
    down=()=>{
        let scrollTop=document.documentElement.scrollTop;
        let qu = document.getElementsByClassName('question')[0];
        if(qu != null){
            if(scrollTop>this.state.num2){//声明一个变量存储当前的scrollTop 变量初始值为零
                this.state.num2=scrollTop;
                this.state.opacity+=-this.state.sleep;
                if(this.state.opacity<=0 ||scrollTop>qu.offsetTop){this.state.opacity=0}
            }
            if(scrollTop<this.state.num2){//条件未成立前不会赋值 所以此时num2依然是上一次的scrollTop值
                this.state.num2=scrollTop;
                this.state.opacity+=this.state.sleep;
                if(this.state.opacity>=1 ||scrollTop>qu.offsetTop){this.state.opacity=1}
            }
            this.setState({
                opacity:this.state.opacity,
                num2:this.state.num2
            });
        }
    };
    com(){
        this.props.history.go(-1)
    }
    ar(){
        this.state.flag=true;
        this.setState({
            flag:this.state.flag
        });
    }
    van(){
        this.state.flag=false;
        this.setState({
            flag:this.state.flag
        });
        document.body.style.overflow=''
    }
    componentDidUpdate(){
        if(this.state.flag===true){
            this.refs.cover.style.display='block'
        }else{
            this.refs.cover.style.display='none'
        }
        if(this.state.pop===true){
            this.refs.pop.style.color='red';
        }else{
            this.refs.pop.style.color='#fff'
        }
        if(this.state.coll===true){
            this.refs.collect.style.color='yellow';
        }else{
            this.refs.collect.style.color='#fff'
        }
        if(this.state.flag===true){
            document.body.style.position='fixed'
        }else{
            document.body.style.position='static'
        }
    }
    pop(){
        this.state.num=this.state.popularity+1;
        this.setState({
            pop:!this.state.pop,
            num:this.state.num
        })
    }
    collect(){
        if(this.state.coll===false){
            Store.dispatcher.dispatch({
                Type:'a',
                arr:{
                    src:this.state.topSrc,
                    id:this.props.location.state.id,
                    title:this.state.details.title
                }
            });
            this.state.coll=true;
        }else{
            Store.state.arr.forEach((val,index)=>{
                if(val.id==this.props.location.state.id){
                    Store.state.arr.splice(index,1)
                }
            });
            this.state.coll=false;
        }
        this.setState({
            coll:this.state.coll,
        });
    }
    word(){
        window.removeEventListener('scroll',this.down)
        this.props.history.push({
            pathname:'/word',
            state:{id:this.props.location.state.id,num:this.state.comments}
        })
    }
}
export default Details
