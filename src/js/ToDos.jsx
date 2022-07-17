import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export const ToDos = (props) => {
  const [textEntered, setTextEntered] = useState("");
  const [todo, setTodos] = useState([]);

  function inputValue(e) {
    const itemValue = e.target.value;
    setTextEntered(itemValue);
  };

    useEffect(() => {
    fetch("http://assets.breatheco.de/apis/fake/todos/user/alex")
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        setTodos(data);
      })
      .catch(error => {
        console.log(error);
        fetch("http://assets.breatheco.de/apis/fake/todos/user/alex", {
          method: "POST",
          body: JSON.stringify([]),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(resp => {
              return resp.json();
          })
          .then(data => {
              console.log(data);
          })
          .catch(error => {
              console.log(error);
          });
      });
  }, []);

  let addTodo = e => {
    if (e.keyCode == 13) {
      let todoText = e.target.value;
      let textEntered = { label: todoText, done: false };
      let newTodos = [...todo, textEntered];
      setTodos(newTodos);
      setTextEntered("");
      fetch("http://assets.breatheco.de/apis/fake/todos/user/alex", {
        mehod: "PUT",
        body: JSON.stringify(newTodos),
        headers: {
          "Content-Type": "application/json",
        },
        })
        .then(resp => {
          return resp.json();
        })
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.log(error);
        });
    }
  };

  let deleteTodo = i => {
    let clearTodo = todo.filter((the, index) => index !== i);
    setTodos(clearTodo);
    fetch("http://assets.breatheco.de/apis/fake/todos/user/alex", {
      mehod: "PUT",
      body: JSON.stringify(clearTodo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };


  let clearTodos = i => {
    setTodos([]);
    fetch("http://assets.breatheco.de/apis/fake/todos/user/alex", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div>
      <div className="todo-container">
        <div>
          <h1><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-brightness-alt-high" viewBox="0 0 16 16">
					<path d="M8 3a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 3zm8 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zm-13.5.5a.5.5 0 0 0 0-1h-2a.5.5 0 0 0 0 1h2zm11.157-6.157a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm-9.9 2.121a.5.5 0 0 0 .707-.707L3.05 5.343a.5.5 0 1 0-.707.707l1.414 1.414zM8 7a4 4 0 0 0-4 4 .5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5 4 4 0 0 0-4-4zm0 1a3 3 0 0 1 2.959 2.5H5.04A3 3 0 0 1 8 8z" />
				</svg>reminders</h1>
          <div>
            <input
              type="text"
              className="input"
              id="remindbox"
              onKeyDown={addTodo}
              onChange={inputValue}
              placeholder="remind me too . . ."
            />
          </div>
          <form id="inputform">
            {todo.map((the, index) => (
              <div key={index} className="todo-text">
                <i onClick={() => deleteTodo(index)} id="icon" class="fa-solid fa-quote-left fa-fade"></i>
                <span>{the.label}</span>
                <i onClick={() => deleteTodo(index)} id="icon" class="fa-solid fa-quote-right fa-fade"></i>
              </div>
            ))}
          </form>
        <div id="footer">
                <button
						className="btn fa-lg"
                        id="buttonstyle"
						onClick={() => clearTodos()}>
						<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
</svg>
				</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ToDos;