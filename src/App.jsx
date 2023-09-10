import { useState, useEffect } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Loads the todos from the LocalStorage during page refresh
  useEffect(() => {
    let tempData = localStorage.getItem('todos');
    if (tempData) {
      setTodos(JSON.parse(tempData));
    } else {
      setTodos([]);
    }
  }, []);

  // Adds a new todo
  function addTodos(item) {
    if (item === '') {
      alert('Empty todos are not allowed');
      return;
    }
    let todoObj = {
      name: item,
      isCompleted: false,
      todoIndex: currentIndex,
    };
    setTodos([...todos, todoObj]);
    // Stores the todos in localStorage
    localStorage.setItem('todos', JSON.stringify([...todos, todoObj]));
    setCurrentTodo('');
    setCurrentIndex(currentIndex + 1);
  }

  // Deletes a todo
  function deleteTodo(index) {
    let indexOfDeletedTodo = index;
    // Removes the todo as per index number
    let temp = todos.splice(index, 1);

    // Update the todo index numbers once a todo has been deleted
    for (let i = indexOfDeletedTodo; i < todos.length; i++) {
      todos[i].todoIndex = todos[i].todoIndex - 1;
    }
    setTodos([...todos]);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  //  Marks a todo as completed
  function toggleCompleted(indexNumber) {
    let tempTodos = todos.map((item) => {
      if (item.todoIndex === indexNumber) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    setTodos([...tempTodos]);
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return (
    <div className='App'>
      <h1>Simple Todo App</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodos(currentTodo);
        }}
      >
        <input
          style={{ width: '50vw' }}
          type='text'
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
          placeholder='Enter your todos here....'
        />
      </form>
      {todos.map((todoItem) => {
        return (
          <div
            style={{
              border: 'solid lightgray 2px',
              margin: '10px',
              width: '50vw',
            }}
            key={todoItem.todoIndex}
          >
            <input
              onChange={() => toggleCompleted(todoItem.todoIndex)}
              type='checkbox'
              id='myCheckbox'
              name='myCheckbox'
              value='true'
            />
            <span
              style={
                todoItem.isCompleted ? { textDecoration: 'line-through' } : {}
              }
            >
              {todoItem.name}
            </span>
            <span
              onClick={() => deleteTodo(todoItem.todoIndex)}
              style={{
                color: 'red',
                position: 'relative',
                left: '40px',
                cursor: 'pointer',
              }}
            >
              X
            </span>
          </div>
        );
      })}
    </div>
  );
}
