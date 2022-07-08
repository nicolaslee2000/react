import React, { useContext, useReducer } from "react";

import {InputContext}  from "../contexts/InputContext";
import reducer, {initialState} from "../contexts/todoReducer";



function Input() {
    const {insertTodo, input, changeText} = useContext(InputContext);
    const {state, dispatch} = useReducer(reducer, initialState);

    return (
      <form onSubmit={insertTodo}>
        <label>
          Todo &nbsp;
          <input
            type="text"
            required={true}
            value={input}
            onChange={changeText}
          />
        </label>
        <input type="submit" value="Create" />
      </form>
    );
}



export default Input;