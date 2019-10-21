/**
 * Created by Administrator on 2019/10/15.
 */
import React from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'

const  Public =(props)=>{

        return(
            <div>
             <Switch>
                {
                    props.cont.map((val,index)=>{
                        if(val.path=='*'){
                            return <Redirect to={val.redirect} key={index}></Redirect>
                        }else{
                            return <Route path={val.path} component={val.component} key={index}></Route>
                        }
                    })
                }
             </Switch>
            </div>
        )
}
export default Public
