import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'

type Todo = {
  id: number
  title: string
  done: boolean
}

function App() {

  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);

  const save = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoItem })
    };
    fetch('api/save', requestOptions)
      .then(response => response.json())
  };

  const [todos, setTodos] = useState<Todo[] | undefined>()
  useEffect(() => {
    //  const getOption = {
    //    method: 'GET',
    //    headers: { 'Content-Type': 'application/json' },
    //  };
    fetch('api/get')//, getOption)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data as Todo[])
      });
  }, [todoItem]
  )

  const remove = () => {
    fetch('api/remove/' + todoItem, { method: 'DELETE' })
      .then(response => response.json())
  };
  //const save = () => fetch('api/save')
  //  .then((data) => {
  //    console.log(data)
  //  });

  //React.useEffect(() => {
  //  const requestOptions = {
  //    method: 'POST',
  //    headers: { 'Content-Type': 'application/json' },
  //    body: JSON.stringify({ title: 'React Hooks POST Request Example' })
  //  };
  //  fetch('api/save', requestOptions)
  //    .then(response => response.json())
  //    //.then(data => setPostId(data.id));
  //}, []);

  return (
    <div className="App">
      <div>
        <label>
          Add new task:
          <input type="text" name="name" onChange={onChange} />
        </label>
        <button value="Save" onClick={save}>Save</button>
        <button value="Remove" onClick={remove}>Delete</button>
      </div>
      <div>
        {todos?.map((todos) => <li>{todos.id} - {todos.title} </li>)}
      </div>
    </div>
  )
}

export default App
