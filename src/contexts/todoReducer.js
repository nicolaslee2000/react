export const initialState = {
    todos:[],
    input:""
}

function reducer(state, action){
    switch(action.type){
		
      case "list_todo" : 
        return {
          ...state, todos:action.payload
        }
       
      default : 
         return state;
    }
  }

  export default reducer;