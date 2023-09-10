import { useState, useEffect } from 'react';
import "./App.css"
import { v4 } from 'uuid';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState('');

  // Loads the todos from the LocalStorage during page refresh
  useEffect(() => {
    let tempData = localStorage.getItem('todos');
    if (tempData) {
      setTodos(JSON.parse(tempData));
    } else {
      setTodos([]);
    }
  }, []);

  // to generate a new unique id
  function generateNewId() {
    return v4()
  }

  // Adds a new todo
  function addTodos(item) {
    if (item === '') {
      alert('Empty todos are not allowed');
      return;
    }
    let todoObj = {
      name: item,
      isCompleted: false,
      todoId: generateNewId(), // using the unique id
    };
    setTodos([...todos, todoObj]);
    // Stores the todos in localStorage
    localStorage.setItem('todos', JSON.stringify([...todos, todoObj]));
    setCurrentTodo('');
  }

  // Deletes a todo
  function deleteTodo(id) {

    // creating a new list temp list which will return a new list without the deleted item.
    let temp = todos.filter((item) => {
      return item.todoId != id;
    })

    setTodos([...temp]);
    localStorage.setItem('todos', JSON.stringify([...temp]));
  }

  //  Marks a todo as completed
  function toggleCompleted(id) {
    let tempTodos = todos.map((item) => {
      if (item.todoId === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos([...tempTodos]);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return (
    <div className='App'>
      <h1 className='heading'>Simple Todo App</h1>
      <div className='item-container'>
        <form
          className='input-form'
          onSubmit={(e) => {
            e.preventDefault();
            addTodos(currentTodo);
          }}
        >
          <input
            className='todo-input'
            type='text'
            value={currentTodo}
            onChange={(e) => setCurrentTodo(e.target.value)}
            placeholder='Enter your todos here....'
          />
          <button className='add-btn'>Add</button>
        </form>
        <div className='list-container'>
          {todos.map((todoItem) => {
            return (
              <div
                className='list-item-card'
                key={todoItem.todoId}
              >
                <div className='item-details'>
                  <input
                    onChange={() => toggleCompleted(todoItem.todoId)}
                    type='checkbox'
                    id='myCheckbox'
                    name='myCheckbox'
                    value='true'
                    checked={todoItem.isCompleted}
                  />
                  <p
                    style={
                      todoItem.isCompleted ? { textDecoration: 'line-through' } : {}
                    }
                  >
                    {todoItem.name}
                  </p>
                </div>
                <button
                  onClick={() => deleteTodo(todoItem.todoId)}
                  className='delete-btn'
                >
                  <img src="/delete.png" alt="" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
