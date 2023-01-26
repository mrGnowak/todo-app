import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Button, Modal, Popconfirm, Col, Row, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

interface Todo {
  id: string;
  title: string;
  status: string;
}
//type Todo = {
//  id: string;
//  title: string;
//  status: string;
//};
function App() {
  const { Title } = Typography;

  //const [todos, setTodos] = useState<Todo[] ! undefined>();
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', title: 'Todo 1', status: 'To Do' },
    { id: '2', title: 'Todo 2', status: 'To Do' },
    { id: '3', title: 'Todo 3', status: 'Done' },
    { id: '4', title: 'Todo 4', status: 'Done' },
    { id: '5', title: 'Todo 5', status: 'To Do' },
    { id: '6', title: 'Todo 6', status: 'To Do' },
    { id: '7', title: 'Todo 7', status: 'Progres' },
    { id: '8', title: 'Todo 8', status: 'Done' },
  ]);
  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const update = () => {
    if (isLoading) return;
    setIsLoading(true);
    fetch('api/get')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data as Todo[]);
      })
      .finally(() => setIsLoading(false));
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newTodos = todos !== undefined ? Array.from(todos) : [];
    const index = newTodos.findIndex((todo) => todo.id === result.draggableId);

    const [removed] = newTodos.splice(index, 1);
    if (result.destination.droppableId === 'to-do') {
      removed.status = 'To Do';
    } else if (result.destination.droppableId === 'done') {
      removed.status = 'Done';
    } else if (result.destination.droppableId === 'progres') {
      removed.status = 'Progres';
    }
    newTodos.splice(result.destination.index, 0, removed);
    setTodos(newTodos);
  };

  //seEffect(() => {
  // update();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  //, []);

  const save = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoItem }),
    };
    fetch('api/save', requestOptions)
      .then((response) => response.json())
      .then(() => update());
  };

  const remove = (val: number) => {
    fetch('api/remove/' + val, { method: 'DELETE' }).then(() => update());
  };

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

  //const handleAddTodo = (title: string) => {
  //  const newTodo = {
  //    id: Date.now().toString(),
  //    title,
  //    status: 'To Do',
  //  };
  //  setTodos([...todos, newTodo]);
  //};
  //const [todo, setTodo] = useState();
  //
  //const onDragEnd = (result: DropResult) => {
  //  const { source, destination } = result;
  //  if (!destination) return;
  //};
  ////   const items = Array.from(todo);
  //  const [newOrder] = items.splice(source.index, 1);
  //  items.splice(destination.index, 0, newOrder);
  //
  //  setTodo(items);
  //};
  return (
    <div>
      <Title>ToDoApp</Title>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          <Col span={8}>
            <StrictModeDroppable droppableId="to-do">
              {(provided) => (
                <div className="title" {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="rcorners2">
                    <div className="rcorners1" style={{ padding: '10px' }}>
                      <Row wrap={false}>
                        <Col flex="auto">
                          <Title level={3}>ToDo</Title>
                        </Col>
                        <Col flex="50px">
                          <h3>
                            <Button
                              type="primary"
                              onClick={showModal}
                              style={{ backgroundColor: 'rgb(120, 120, 120)' }}
                            >
                              <PlusOutlined />
                            </Button>
                          </h3>
                        </Col>
                      </Row>
                      <Modal title="Add new task: " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <input type="text" name="name" onChange={onChange} />
                      </Modal>
                    </div>

                    <div style={{ padding: '10px' }}>
                      {todos
                        .filter((todo) => todo.status === 'To Do')
                        .map(({ id, title, status }, index) => {
                          return (
                            <Draggable key={id} draggableId={id} index={index}>
                              {(provided) => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  <div style={{ marginTop: '2px', marginBottom: '2px' }}>
                                    <Row wrap={false}>
                                      <Col flex="auto">
                                        <div>{title}</div>
                                      </Col>
                                    </Row>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                    </div>
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </StrictModeDroppable>
          </Col>

          <Col span={8}>
            <StrictModeDroppable droppableId="progres">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="rcorners2">
                    <div className="rcorners1" style={{ padding: '10px' }}>
                      <Title level={3}>In progress</Title>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div>
                        {todos
                          .filter((todo) => todo.status === 'Progres')
                          .map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                              {(provided) => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  {todo.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </div>
                    </div>
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </Col>
          <Col span={8}>
            <StrictModeDroppable droppableId="done">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="rcorners2">
                    <div className="rcorners1" style={{ padding: '10px' }}>
                      <Title level={3}>Done</Title>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div>
                        {todos
                          .filter((todo) => todo.status === 'Done')
                          .map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id} index={index}>
                              {(provided) => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  {todo.title}
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </div>
                    </div>
                  </div>

                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </Col>
        </Row>
      </DragDropContext>
    </div>
  );
}

export default App;
//<Space wrap>
//          <Button type="primary" value="Save" onClick={save}>Save</Button>
//          <Button type="primary" value="Remove" onClick={remove}>Delete</Button>
//        </Space>

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
//}, []);]

//</Col>
//                                      <Col flex="50px">
//                                        <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
//                                          <EditOutlined />
//                                        </Button>
//                                      </Col>
//                                      <Col flex="50px">
//                                        {/*<Popconfirm
//                                        placement="bottomLeft"
//                                        title={text}
//                                        description={description}
//                                        onConfirm={() => remove(id)}
//                                        okText="Yes"
//                                        cancelText="No"
//                                      >
//                                        <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
//                                          <DeleteOutlined />
//                                        </Button>
//                            </Popconfirm>*/}
