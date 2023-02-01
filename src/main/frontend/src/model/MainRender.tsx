import React, { useEffect, useState } from 'react';
import '.././App.css';
import { Button, Modal, Col, Row, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import TodoItem from './TodoItem';
import { Todo } from './types';

const TODO = 'to-do';
const DONE = 'done';
const PROGRESS = 'progress';

function MainRender() {
  const { Title } = Typography;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const update = React.useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetch('api/get')
      .then((response) => response.json())
      .then((data) => {
        setTodos(data as Todo[]);
      })
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const newTodos = Array.from(todos);
    const index = newTodos.findIndex((todo) => todo.id.toString() === result.draggableId);
    const [removed] = newTodos.splice(index, 1);

    if (result.destination.droppableId === TODO) {
      removed.columnName = TODO;
    } else if (result.destination.droppableId === DONE) {
      removed.columnName = DONE;
    } else if (result.destination.droppableId === PROGRESS) {
      removed.columnName = PROGRESS;
    }

    newTodos.splice(result.destination.index, 0, removed);

    //const newColumn = newTodos.filter((todo) => todo.columnName === removed.columnName);
    //newColumn.forEach((todo, index) => {
    //  todo.position = index;
    //});

    setTodos(newTodos);
    //update();
    //tutaj trzeba dodać pusha do bazy danych, bo nie updateuje columny, a tylko odświeża.
    //updateTodo(removed);
  };

  useEffect(() => {
    update();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: todoItem, columnName: TODO }),
    };
    fetch('api/save', requestOptions)
      .then((response) => response.json())
      .then(() => update());
  };

  const onRemove = React.useCallback(
    (id: number) => {
      fetch('api/remove/' + id, { method: 'DELETE' }).then(() => update());
    },
    [update]
  );

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div>
      <Title>ToDoApp</Title>
      <div>
        <Button type="primary" onClick={() => setIsModalOpen(true)} style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
          <PlusOutlined />
        </Button>
        <Modal
          title="Add new task: "
          open={isModalOpen}
          onOk={() => {
            setIsModalOpen(false);
            save();
          }}
          onCancel={() => setIsModalOpen(false)}
        >
          <input type="text" name="name" onChange={onChange} />
        </Modal>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          <Col span={8}>
            <StrictModeDroppable droppableId={TODO}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="rcorners2">
                    <div className="rcorners1" style={{ padding: '10px' }}>
                      <Title level={3}>TODO</Title>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div>
                        {todos
                          .filter((todo) => todo.columnName === TODO)
                          .map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                              {(provided) => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  <TodoItem item={todo} onRemove={onRemove} />
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
            <StrictModeDroppable droppableId={PROGRESS}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="rcorners2">
                    <div className="rcorners1" style={{ padding: '10px' }}>
                      <Title level={3}>IN PROGRESS</Title>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div>
                        {todos
                          .filter((todo) => todo.columnName === PROGRESS)
                          .map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                              {(provided) => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  <TodoItem item={todo} onRemove={onRemove} />
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
            <StrictModeDroppable droppableId={DONE}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <div className="rcorners2">
                    <div className="rcorners1" style={{ padding: '10px' }}>
                      <Title level={3}>DONE</Title>
                    </div>
                    <div style={{ padding: '10px' }}>
                      <div>
                        {todos
                          .filter((todo) => todo.columnName === DONE)
                          .map((todo, index) => (
                            <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                              {(provided) => (
                                <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                  <TodoItem item={todo} onRemove={onRemove} />
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
export default MainRender;

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
