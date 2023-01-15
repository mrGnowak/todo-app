import React, { useEffect } from 'react'
import { useState } from 'react'
import './App.css'
import { Button, Modal, Popconfirm } from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';

type Todo = {
  id: number
  title: string
  done: boolean
}

function App() {

  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const update = () => {
    if (isLoading)
      return;
    setIsLoading(true)
    fetch('api/get')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data as Todo[])
      })
      .finally(() => setIsLoading(false))
  }

  const save = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoItem })
    };
    fetch('api/save', requestOptions)
      .then(response => response.json())
      .then(() => update())
  };

  const remove = (val: number) => {
    fetch('api/remove/' + val, { method: 'DELETE' })
      .then(() => update())
  };

  const [todos, setTodos] = useState<Todo[] | undefined>()

  useEffect(() => {
    update();
  }, []
  )

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    save();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const text = 'Are you sure to delete this task?';
  const description = 'Delete the task';
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
      <Button type="primary" onClick={showModal}>
      <PlusOutlined />
      </Button>
      <Modal title="Add new task: " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <input type="text" name="name" onChange={onChange} />
      </Modal>
      </div>
      <div>
        {todos?.map((todos) => 
        <li>{todos.id} - {todos.title} 
        <Button type="primary" value={todos.id} onClick={() => remove(todos.id)}>
          <DeleteOutlined />
          </Button>
        </li> 
        )}
      </div>
    </div>
  )
}

export default App
//<Space wrap>
//          <Button type="primary" value="Save" onClick={save}>Save</Button>
//          <Button type="primary" value="Remove" onClick={remove}>Delete</Button>
//        </Space>