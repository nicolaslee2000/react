import { createStore } from "redux";

function reducer(state, action){
    if(state===undefined){
        return {
            number:0,
        }  
    }
 
    const newState = {...state};
    if(action.type==='INCREMENT')
       newState.number++;
 
    return newState;
 }
 
 
 export const  store = createStore(reducer);