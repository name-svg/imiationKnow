/**
 * Created by Administrator on 2019/10/15.
 */
import React from 'react'
import {Route,Switch} from 'react-router-dom'

import Index from '../component/index.js'
import Details from '../component/index.js'
let First = [
    {
      path:'/index',
      component:Index
    },
    {
        path:'/details',
        component:Details
    },
    {
        path:'*',
        redirect:'/index'
    },
];
export default First
