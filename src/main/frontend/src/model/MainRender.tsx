import React, { useCallback, useEffect, useState } from 'react';
import '.././App.css';
import { Button, Col, Row, Typography, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from './types';
import Column from './Column';

const TODO = 'to-do';
const DONE = 'done';
const PROGRESS = 'progress';

export default function MainRender() {
  const { Title } = Typography;
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refresh = React.useCallback(() => {
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

    setTodos(newTodos);
    onUpdate(removed.id, removed.title, removed.columnName);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    if (todoItem !== undefined && todoItem.trim().length !== 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: todoItem, columnName: TODO }),
      };
      fetch('api/save', requestOptions)
        .then((response) => response.json())
        .then(() => refresh())
        .then(() => setTodoItem(''));
    }
  };

  const onRemove = useCallback(
    (id: number) => {
      fetch('api/remove/' + id, { method: 'DELETE' }).then(() => refresh());
    },
    [refresh]
  );

  const onUpdate = useCallback(
    (itemId: number, itemTitle: string, itemColumnName: string) => {
      if (itemTitle !== undefined && itemTitle.trim().length !== 0) {
        fetch('api/put', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: itemId, title: itemTitle, columnName: itemColumnName }),
        })
          .then((response) => response.json())
          .then(() => refresh());
      }
    },
    [refresh]
  );

  return (
    <>
      <Title>TO DO APP</Title>
      <Input
        style={{ maxWidth: 500, margin: '5px' }}
        value={todoItem}
        onPressEnter={save}
        type="text"
        name="name"
        onChange={onChange}
      />
      <Button type="primary" onClick={save} style={{ backgroundColor: 'rgb(120, 120, 120)' }}>
        <PlusOutlined />
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row>
          <Col span={8}>
            <Column onRemove={onRemove} colName={TODO} titleColumn={'TODO'} todos={todos} onUpdate={onUpdate} />
          </Col>
          <Col span={8}>
            <Column
              onRemove={onRemove}
              colName={PROGRESS}
              titleColumn={'IN PROGRESS'}
              todos={todos}
              onUpdate={onUpdate}
            />
          </Col>
          <Col span={8}>
            <Column onRemove={onRemove} colName={DONE} titleColumn={'DONE'} todos={todos} onUpdate={onUpdate} />
          </Col>
        </Row>
      </DragDropContext>
    </>
  );
}
