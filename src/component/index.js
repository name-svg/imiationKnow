/**
 * Created by Administrator on 2019/10/15.
 */
import React from 'react'
import Swiper from 'swiper'
import axios from 'axios'
import Store from '../store/index.js'
import '../assion/css/index.css'
import Na from './navs2'

class Index extends React.Component{
    constructor(props){
        super(props);
        this.state={
            open:Store.state.open,
            data:[],
            day:[],
            time:'',
            arr:[],
            cont:'首页',
            height:'',
            num:0,
            flags:false,
            fn:(tm)=>{
                let t = tm.replace('2019','').substr(0,2)+'月'+tm.replace('2019','').substr(2)+'日';
                let t1 = tm.substr(0,4)+','+tm.substr(4,2)+','+tm.substr(6)+','+'00:00:00';
                let t2 = new Date(t1).getDay();
                let week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
                let day=week[t2];
                return t+' '+day;
            },
            fn2:(re)=>{
                if(this.state.flags==true){return re}else{return ''}
            },
        };
        this.hand=this.hand.bind(this);
        this.as = this.as.bind(this);
        this.re = this.re.bind(this)
    }
render(){
    return(
    <div className="index" ref="index">
        <nav>
            <span className="iconfont icon-quanbu Ls" onClick={this.as}></span>
            <h5>{this.state.cont}</h5>
            <span className="iconfont icon-shenglvehao rs"></span>
            <span className="iconfont icon-lingdang cs"></span>
        </nav>
        <div className="swiper-container ws">
            <div className="swiper-wrapper">
                {
                    this.state.data.map((val,index)=>{
                        return <div className="swiper-slide" key={index} onClick={this.first.bind(this,val.id)}><h2>{val.title}</h2><img src={val.image} key={index}/></div>
                    })
                }
            </div>
            <div className="swiper-pagination"></div>
        </div>
        <dl>
            <dt className="day">今日热闻</dt>
            {
                this.state.day.map((val,index)=>{
                    return <dd key={index} onClick={this.One.bind(this,val.id)}>
                        <h5>{val.title}</h5>
                        <div><img src={val.images[0]}/></div>
                    </dd>
                })
            }
        </dl>
        {
            this.state.arr.map((val,index)=>{
                return <dl key={index} >
                    <dt className="yesterday">{
                    this.state.fn(val.date)
                }</dt>
                    {
                        val.stories.map((val2,index)=>{
                            return <dd key={index} onClick={this.Two.bind(this,val2.id)}>
                                <h5>{val2.title}</h5>
                                <div><img src={val2.images[0]}/></div>
                            </dd>
                        })
                    }
                </dl>
            })
        }
        <Na pro={this.props} re={this.re}></Na>
    </div>
    )
}
    componentDidMount() {
        document.body.style.overflow='';
        window.addEventListener('scroll',this.hand);
        axios.get('/api/4/news/latest').then((res)=>{
            this.state.time=res.data.date;
            this.state.day=[...res.data.stories];
            this.state.data=[...res.data.top_stories];
                this.setState({
                    data:this.state.data,
                    day:this.state.day,
                    time:this.state.time
            });
            axios.get('/api/4/news/before/'+this.state.time).then((res)=>{
                setTimeout(()=>{
                    this.state.arr.push(res.data);
                    this.state.time=res.data.date;
                    this.setState({
                        time:this.state.time,
                        num:this.state.num,
                        arr:this.state.arr,
                        title:this.state.title
                    })
                })
            });
            setTimeout(() => {
                var swiper = new Swiper('.swiper-container', {
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: {
                        delay: 2500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true,
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                });
            });
        });
    }
    hand(){
        let scrollTop=document.documentElement.scrollTop;
        let Day = document.getElementsByClassName('day')[0];
        if(Day != null){
            let Yay = Array.from(document.getElementsByClassName('yesterday'));
            if(this.state.data.length>0){
                if(scrollTop>Day.offsetTop){this.state.cont='今日热闻'}else{this.state.cont='首页'}
                this.setState({
                    cont:this.state.cont
                });
            }
            if(Yay != null){
                Yay.map((val,index)=>{
                    if(scrollTop-val.offsetTop>=0){
                        this.state.cont=this.state.fn(this.state.arr[index].date);
                        this.setState({
                            cont:this.state.cont
                        })
                    }
                })
            }
            if(scrollTop>=document.documentElement.scrollHeight-document.documentElement.clientHeight){
                axios.get('/api/4/news/before/'+this.state.time).then((res)=>{
                    setTimeout(()=>{
                        this.state.arr.push(res.data);
                        this.state.time=res.data.date;
                        this.setState({
                            time:this.state.time,
                            num:this.state.num,
                            arr:this.state.arr,
                            title:this.state.title
                        })
                    })
                })
            }
        }
    }
    One(x){
        window.removeEventListener('scroll',this.hand);
        this.props.history.push({
            pathname:'/details',
            state:{id:x}
        })
    }
    Two(y){
        window.removeEventListener('scroll',this.hand);
        this.props.history.push({
            pathname:'/details',
            state:{id:y}
        })
    }
    first(z){
        window.removeEventListener('scroll',this.hand);
        this.props.history.push({
            pathname:'/details',
            state:{id:z}
        })
    }
    as(e){
        Store.dispatcher.dispatch({
            Type:'b',
            open:true
        });
        document.body.style.overflow='hidden';
        e.stopPropagation();
        this.setState({
            flags:true,
            open:true,
        })
    }
    re(){
        document.body.style.overflow='';
        this.setState({
           flags:false
        });
        Store.dispatcher.dispatch({
            Type:'a',
            open:false,
        })
    }
    componentWillUnmount(){
        this.setState=(state,callback)=>{
            return
        }
    }
}
export default Index
