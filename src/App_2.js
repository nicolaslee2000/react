import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Input from "./components/input";
import Todo from "./components/todo";

//props

function App() {
    const baseUrl = "http://localhost:8090";

    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        getTodos();
    }, []);

    async function getTodos() {
        await axios
            .get(baseUrl + "/todo/all")
            .then((response) => {
                console.log(response.data);
                setTodos(
                    response.data.map((todo) => {
                        return {
                            ...todo,
                            completed: todo.completed === "1" ? true : false,
                        };
                    })
                );
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const insertTodo = async (e) => {
        e.preventDefault();
        await axios
            .post(baseUrl + "/todo", {
                todoname: input,
            })
            .then((response) => {
                console.log(response.data);
                setInput("");
                getTodos();
            })
            .catch((error) => {
                console.error(error);
            });
        console.log("할일이 추가됨!");
    };

    const updateTodo = async (id, completed) => {
        await axios
            .put(baseUrl + "/todo/" + id + "/" + (completed ? "1" : "0"), {})
            .then((response) => {
                setTodos(
                    todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    )
                );
                console.log(todos);
            })

            .catch((error) => {
                console.log(error);
            });
    };

    const deleteTodo = async (id) => {
        await axios
            .delete(baseUrl + "/todo/" + id, {})
            .then((response) => {
                setTodos(todos.filter((todo) => todo.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    function changeText(e) {
        e.preventDefault();
        setInput(e.target.value);
    }

    return (
        <div className="App">
            <h1>TODO LIST</h1>
            <Input
                handleSubmit={insertTodo}
                input={input}
                handleChange={changeText}
            />

            {todos
                ? todos.map((todo) => {
                      return (
                          <Todo
                              key={todo.id}
                              todo={todo}
                              handleClick={() =>
                                  updateTodo(todo.id, todo.completed)
                              }
                              handleDelete={() => deleteTodo(todo.id)}
                          />
                      );
                  })
                : null}
        </div>
    );
}

export default App;
