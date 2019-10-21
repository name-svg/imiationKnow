/**
 * Created by Administrator on 2019/10/17.
 */
import {Dispatcher} from 'flux'

import EventsEmitter from 'events'
class State extends EventsEmitter{
    arr=[];
    open=false
}

var state = new State();
var dispatcher = new Dispatcher();

dispatcher.register((childArr)=>{
   switch(childArr.Type){
       case 'a':
           console.log(2);
           state.arr.push(childArr.arr);

                state.emit('come');
           break;

       case 'b':
           console.log(3);
           // console.log(childArr.open);
           state.open=childArr.open;
           state.emit('b');
           break;
   }
});

export default {state,dispatcher}