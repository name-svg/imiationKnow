/**
 * Created by Administrator on 2019/10/15.
 */

import Index from '../component/index.js'
import Details from '../component/details.js'
import Word from '../component/word.js'
import Collect from '../component/collect.js'


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
        path:'/word',
        component:Word
    },
    {
        path:'/collect',
        component:Collect
    },
    {
        path:'*',
        redirect:'/index'
    },
];
export default First
