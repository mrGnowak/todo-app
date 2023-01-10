import React from 'react'
import { useState } from 'react'
import './App.css'

type Todo = {
  id: number
  title: string
  done: boolean
}

function App() {

  const [todos, setTodos] = React.useState<Todo[] | undefined>()
  React.useEffect(() => {
    //  const getOption = {
    //    method: 'GET',
    //    headers: { 'Content-Type': 'application/json' },
    //  };
    fetch('api/get')//, getOption)
      .then((response) => response.json())
      .then((data) => {
        setTodos(data as Todo[])
      });
  }, []
  )
  const [todoItem, setTodoItem] = React.useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);

  const test = () => fetch('api/test')
    .then((data) => {
      console.log(data)
    });

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
        <button value="Save" onClick={test}>Save</button>
      </div>
      {todoItem}
      <div>
        <select>
          {todos?.map((todos) => <option>{todos.title}</option>)}
        </select>
      </div>


    </div>
  )
}

export default App
