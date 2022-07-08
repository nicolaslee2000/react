import React, { useContext } from "react";
import {InputContext}  from "../contexts/InputContext";



function Input() {
    const {insertTodo, input, changeText} = useContext(InputContext);

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