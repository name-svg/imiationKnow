/**
 * Created by Administrator on 2019/10/15.
 */
import React from 'react'
import '../assion/css/word.css'
import '../../node_modules/animate.css/animate.css'
import axios from 'axios'
import moment from 'moment'
import a from '../assion/img/timg.jpg'

let time1 = undefined;
let time2 = undefined;
class Word extends React.Component{
    constructor(props){
        super(props);
        this.state={
            comments:[],
            short:[],
            num:0,
            scrollTop:'',
            flag:true,
            up:false,
            height:'0.4rem',
        };
        this.load=this.load.bind(this)
    }
render(){
return(
<div ref="big">
    <div className="up" ref='up'>
        <span className="iconfont icon-fanhuijiantou ll" onClick={this.return.bind(this)}></span>
        <span className="cen">{this.props.location.state.num}条评论</span>
        <span className="iconfont icon-comment rr"></span>
    </div>
    <dl className="long">
        <dt style={{marginTop:'0.5rem'}}>{this.state.comments.length}&nbsp;条长评</dt>
        {(()=>{if(this.state.comments.length<=0){return <dd className="none" style={{height:window.screen.availHeight/100-1.3+'rem'}}><span>深度长评虚位以待</span></dd>}})()}
        {
            this.state.comments.map((val,index)=>{
                return <dd key={index}>
                    <h6><div><img src={val.avatar}/><span>{val.author}</span></div><div><span className="iconfont icon-dianzan"></span><i>{val.likes}</i></div></h6>
                    <p className="review">{val.content}</p>
                    {
                    (()=>{
                        if(val.reply_to != undefined){
                            return <p className={val.unfold==false?'reply hh':'reply'}><strong>//{val.reply_to.author}：</strong>{val.reply_to.content}</p>
                        }
                    })()
                    }
                    <div className="base"><span className="time">{((x)=>{
                        const dataTime = x;
                        let day = moment(Number(dataTime)).format('MM-DD HH:mm');
                       return day
                    })(val.time)}</span>{(()=>{if(val.reply_to != undefined){return <span className="unfold" onClick={this.unfold.bind(this,index)}>{val.unfold==false?'展开':'收起'}</span> }})()}</div>
                </dd>
            })
        }
    </dl>
    <dl className="long short" ref="scroll" style={{height:this.state.height}}>
        <dt onClick={this.load} ref={(el)=>{this.dt=el}}>{this.props.location.state.num-this.state.comments.length}&nbsp;条短评<span className={this.state.up==true?'spp':''}></span></dt>
        {
            this.state.short.map((val,index)=>{
                return <dd key={index}>
                    <h6><div><img src={val.avatar}/><span>{val.author}</span></div><div><span className="iconfont icon-dianzan"></span><i>{val.likes}</i></div></h6>
                    <p className="review">{val.content}</p>
                    {
                        (()=>{
                            if(val.reply_to != undefined){
                                return <p className={val.unfold==false?'reply hh':'reply'}><strong>//{val.reply_to.author}：</strong>{val.reply_to.content}</p>
                            }
                        })()
                    }
                    <div className="base"><span className="time">{((x)=>{
                        const dataTime = x
                        let day = moment(Number(dataTime)).format('MM-DD HH:mm');
                        return day
                    })(val.time)}</span>{(()=>{if(val.reply_to != undefined){return <span className="unfold" onClick={this.fold.bind(this,index)}>{val.unfold==false?'展开':'收起'}</span> }})()}</div>
                </dd>
            })
        }
    </dl>

</div>
)
}
    return(){
        this.props.history.go(-1)
    }
    componentDidMount(){
        let a = this.props.location.state.id;
       axios.get('/api/4/story/'+a+'/long-comments').then((res)=>{
           this.state.comments=[...res.data.comments];
           this.state.comments.forEach((val,index)=>{
               val.unfold=false
           });
           this.setState({
               comments:this.state.comments,
               unfold:this.state.unfold
           })
       });
        axios.get('/api/4/story/'+this.props.location.state.id+'/short-comments').then((res)=>{
            this.state.short=[...res.data.comments];
            this.setState({
                short:this.state.short,
            })
        })
    }
    unfold(x){
        if(this.state.comments[x].unfold===false){
            this.state.comments[x].unfold=true
        }else{
            this.state.comments[x].unfold=false
        }
        this.setState({
            comments:this.state.comments
        })
    }
    fold(y){
        if(this.state.short[y].unfold===false){
            this.state.short[y].unfold=true
        }else{
            this.state.short[y].unfold=false
        }
        this.setState({
            short:this.state.short
        })
    }
load(){
    clearInterval(time1);
    clearInterval(time2);
    setTimeout(()=>{
        if(this.state.flag==true){
            this.state.height='';
            time1=setInterval(()=>{
                document.documentElement.scrollTop+=10;
                if(document.documentElement.scrollTop>=this.refs.scroll.offsetTop-this.refs.up.clientHeight){
                    clearInterval(time1);
                }
                if(document.documentElement.scrollTop>=this.refs.big.offsetHeight-document.documentElement.clientHeight){
                    clearInterval(time1);
                }
            },10);
        }else{
            time2=setInterval(()=>{
                document.documentElement.scrollTop-=10;
                if(document.documentElement.scrollTop<=0){
                    clearInterval(time2);
                    this.setState({
                        height:'0.4rem'
                    })
                }
            },10)
        }
        this.setState({
            flag:!this.state.flag,
            height:this.state.height,
        })
    });
    this.state.short.forEach((val)=>{
        val.unfold=false
    });
    this.setState({
        short:this.state.short,
        up:!this.state.up
    })
}
componentWillUnmount(){
    clearInterval(time1);
    clearInterval(time2)
}
}
export default Word