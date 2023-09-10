import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [isDark, setIsDark] = useState(true);
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

  // Adds a new todo
  function addTodos(item) {
    if (item === '') {
      alert('Empty todos are not allowed');
      return;
    }
    let todoObj = {
      id: uuid(),
      name: item,
      isCompleted: false,
    };
    setTodos([...todos, todoObj]);
    // Stores the todos in localStorage

    localStorage.setItem('todos', JSON.stringify([...todos, todoObj]));
    setCurrentTodo('');
  }

  return (
    <div className={`App ${!isDark ? 'dark' : ''}`}>
      <header className='header'>
        <div className='header__content'>
          <h1 className='header__content--title'>Simple Todo App</h1>
          <i
            onClick={() => setIsDark(!isDark)}
            className={`header__content--icon bx ${
              isDark ? 'bx-moon' : 'bx-sun'
            }`}
          ></i>
        </div>
      </header>
      <main className='main'>
        <div className='main__content'>
          <form
            className='main__content--form'
            onSubmit={(e) => {
              e.preventDefault();
              addTodos(currentTodo);
            }}
          >
            <div className='inputControl'>
              <input
                className='main__content--input'
                type='text'
                value={currentTodo}
                onChange={(e) => setCurrentTodo(e.target.value)}
                placeholder='Enter your todos here....'
              />
              <i
                className='main__content--inputSend bx bxs-send'
                onClick={() => addTodos(currentTodo)}
              ></i>
            </div>
          </form>

          <ul className='main__todoList'>
            {todos.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                setTodos={setTodos}
                todos={todos}
              />
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

const TodoItem = ({ task, setTodos, todos }) => {
  const handelToggleStatus = () => {
    const updatedTodos = todos.map((todo) =>
      todo.id === task.id ? { ...task, isCompleted: !task.isCompleted } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  const handelDeleteTodo = () => {
    const updatedTodos = todos.filter((todo) => todo.name !== task.name);

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(todos));
  };

  return (
    <li className='todoItem'>
      <input
        onChange={handelToggleStatus}
        className='task--check'
        type='checkbox'
        id='myCheckbox'
        name='myCheckbox'
        value='true'
      />
      {!task.isCompleted ? (
        <p className='task--undone'>{task.name}</p>
      ) : (
        <s className='task--done'>{task.name}</s>
      )}
      <i className='task--delete bx bx-trash' onClick={handelDeleteTodo}></i>
    </li>
  );
};
