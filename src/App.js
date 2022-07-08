// https://www.youtube.com/watch?v=UU3jjRwjayg
// https://blckchainetc.tistory.com/285

//react todolist  useReducer

import React, { useState, useEffect, useReducer } from "react";
import "./App.css";
import axios from "axios";
import Input from "./components/input3";
import Todo from "./components/todo3";
import { InputContext } from "./contexts/InputContext";
import { TodoContext } from "./contexts/TodoContext";
import reducer, { initialState } from "./contexts/todoReducer";
// useReducer( )

function App() {
    const baseUrl = "http://localhost:8090";

    // const [todos, setTodos] = useState([]);
    //const [input, setInput] = useState("");
    const { state, dispatch } = useReducer(reducer, initialState);

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        await axios
            .get(baseUrl + "/todo/all")
            .then((response) => {
                console.log(response.data);
                dispatch({ type: "list_todo", payload: response.data });
                //state.todos.push(response.data);
                //setTodos(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const updateTodo = async (id) => {
        await axios
            .put(baseUrl + "/todo/" + id, {})
            .then((response) => {
                //  setTodos(todos.map((todo) =>
                //   todo.id === id ?  { ...todo, completed: !todo.completed} : todo
                // ));
                console.log(response.data);
            })

            .catch((error) => {
                console.log(error);
            });
    };

    const deleteTodo = async (id) => {
        await axios
            .delete(baseUrl + "/todo/" + id, {})
            .then((response) => {
                console.log("delete");
            })
            // .then((response) => {setTodos(todos.filter((todo) => todo.id !== id))})
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="App">
            <h1>TODO LIST</h1>
            {/* <InputContext.Provider value={{insertTodo, input, changeText}}>
      <Input />
    </InputContext.Provider> */}

            {state.todos
                ? state.todos.map((todo) => {
                      return (
                          <TodoContext.Provider
                              value={{ todo, updateTodo, deleteTodo }}
                          >
                              <Todo />
                          </TodoContext.Provider>
                      );
                  })
                : null}
        </div>
    );
}

export default App;
