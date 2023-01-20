import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { Button, Modal, Popconfirm, Col, Row, Typography } from 'antd';
import { PlusOutlined, DeleteOutlined, CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

//type Todo = {
//  id: number;
//  title: string;
//  done: boolean;
//};

const listItems = [
  {
    id: '1',
    name: 'Study Spanish',
  },
  {
    id: '2',
    name: 'Workout',
  },
  {
    id: '3',
    name: 'Film Youtube',
  },
  {
    id: '4',
    name: 'Grocery Shop',
  },
];
const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  padding: 10,
  margin: `0 50px 15px 50px`,
  background: isDragging ? '#4a2975' : 'white',
  color: isDragging ? 'white' : 'black',
  border: `1px solid black`,
  fontSize: `20px`,
  borderRadius: `5px`,

  ...draggableStyle,
});

function App() {
  //const { Title } = Typography;
  //
  //const [todos, setTodos] = useState<Todo[] | undefined>();
  //const [todoItem, setTodoItem] = useState<string | undefined>();
  //const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);
  //
  //const [isLoading, setIsLoading] = useState<boolean>(false);
  //const update = () => {
  //  if (isLoading) return;
  //  setIsLoading(true);
  //  fetch('api/get')
  //    .then((response) => response.json())
  //    .then((data) => {
  //      setTodos(data as Todo[]);
  //    })
  //    .finally(() => setIsLoading(false));
  //};
  //
  //useEffect(() => {
  //  update();
  //  // eslint-disable-next-line react-hooks/exhaustive-deps
  //}, []);
  //
  //const save = () => {
  //  const requestOptions = {
  //    method: 'POST',
  //    headers: { 'Content-Type': 'application/json' },
  //    body: JSON.stringify({ title: todoItem }),
  //  };
  //  fetch('api/save', requestOptions)
  //    .then((response) => response.json())
  //    .then(() => update());
  //};
  //
  //const remove = (val: number) => {
  //  fetch('api/remove/' + val, { method: 'DELETE' }).then(() => update());
  //};
  //
  //const [isModalOpen, setIsModalOpen] = useState(false);
  //
  //const showModal = () => {
  //  setIsModalOpen(true);
  //};
  //
  //const handleOk = () => {
  //  setIsModalOpen(false);
  //  save();
  //};
  //
  //const handleCancel = () => {
  //  setIsModalOpen(false);
  //};
  //
  //const text = 'Are you sure to delete this task?';
  //const description = 'Delete the task';

  const [todo, setTodo] = useState(listItems);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodo(items);
  };
  return (
    <div className="App">
      <h1>Drag and Drop</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <StrictModeDroppable droppableId="todo">
          {(provided) => (
            <div className="todo" {...provided.droppableProps} ref={provided.innerRef}>
              {todo.map(({ id, name }, index) => {
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                      >
                        {name}
                      </div>
                    )}
                  </Draggable>
                );
              })}
            </div>
          )}
        </StrictModeDroppable>
      </DragDropContext>
    </div>
  );
  //
  //    <div>
  //      <Title>ToDoApp</Title>
  //
  //      <Row>
  //        <Col span={8}>
  //          <div className="rcorners2">
  //            <div className="rcorners1" style={{ padding: '10px' }}>
  //              <Row wrap={false}>
  //                <Col flex="auto">
  //                  <Title level={3}>ToDo items</Title>
  //                </Col>
  //                <Col flex="50px">
  //                  <h3>
  //                    <Button type="primary" onClick={showModal} style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
  //                      <PlusOutlined />
  //                    </Button>
  //                  </h3>
  //                </Col>
  //              </Row>
  //              <Modal title="Add new task: " open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
  //                <input type="text" name="name" onChange={onChange} />
  //              </Modal>
  //            </div>
  //            <DragDropContext onDragEnd={onDragEnd}>
  //              <Droppable droppableId="id">
  //                {(provided) => (
  //                  <div className="title" {...provided.droppableProps} ref={provided.innerRef}>
  //                    {todos?.map(({ id, title }, index) => {
  //                      return (
  //                        <Draggable key={id} draggableId={id.toString()} index={index}>
  //                          {(provided) => (
  //                            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
  //                              {title}
  //                            </div>
  //                          )}
  //                        </Draggable>
  //                      );
  //                    })}
  //                    {provided.placeholder}
  //                  </div>
  //                )}
  //              </Droppable>
  //            </DragDropContext>
  //            <div style={{ padding: '10px' }}>
  //              {todos?.map((todo) => (
  //                <div key={todo.id} style={{ marginTop: '2px', marginBottom: '2px' }}>
  //                  <Row wrap={false}>
  //                    <Col flex="auto">
  //                      {todo.title}{' '}
  //                      {todo.done === true ? (
  //                        <CheckOutlined style={{ color: 'green' }} />
  //                      ) : (
  //                        <CloseOutlined style={{ color: 'red' }} />
  //                      )}
  //                    </Col>
  //                    <Col flex="50px">
  //                      <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
  //                        <EditOutlined />
  //                      </Button>
  //                    </Col>
  //                    <Col flex="50px">
  //                      <Popconfirm
  //                        placement="bottomLeft"
  //                        title={text}
  //                        description={description}
  //                        onConfirm={() => remove(todo.id)}
  //                        okText="Yes"
  //                        cancelText="No"
  //                      >
  //                        <Button type="primary" style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
  //                          <DeleteOutlined />
  //                        </Button>
  //                      </Popconfirm>
  //                    </Col>
  //                  </Row>
  //                </div>
  //              ))}
  //            </div>
  //          </div>
  //        </Col>
  //        <Col span={8}>
  //          <div className="rcorners2">
  //            <div className="rcorners1" style={{ padding: '10px' }}>
  //              <Title level={3}>In progress</Title>
  //            </div>
  //            <div style={{ padding: '10px' }}></div>
  //          </div>
  //        </Col>
  //        <Col span={8}>
  //          <div className="rcorners2">
  //            <div className="rcorners1" style={{ padding: '10px' }}>
  //              <Title level={3}>Done</Title>
  //            </div>
  //            <div style={{ padding: '10px' }}></div>
  //          </div>
  //        </Col>
  //      </Row>
  //    </div>
  //  );
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
