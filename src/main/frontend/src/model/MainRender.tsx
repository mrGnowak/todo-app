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

function prepareColumn(todos: Todo[], colName: string) {
  return todos.filter((todo) => todo.columnName === colName);
}

const columnsDefinition = [TODO, DONE, PROGRESS];

export default function MainRender() {
  const { Title } = Typography;
  const [todoCol, setTodo] = useState<Todo[]>([]);
  const [progressCol, setProgress] = useState<Todo[]>([]);
  const [doneCol, setDone] = useState<Todo[]>([]);

  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refresh = React.useCallback(() => {
    //if (isLoading) return;
    //setIsLoading(true);
    fetch('api/get/' + TODO)
      .then((response) => response.json())
      .then((data) => {
        setTodo(data as Todo[]);
      });
    fetch('api/get/' + PROGRESS)
      .then((response) => response.json())
      .then((data) => {
        setProgress(data as Todo[]);
      });
    fetch('api/get/' + DONE)
      .then((response) => response.json())
      .then((data) => {
        setDone(data as Todo[]);
      });
  }, []);

  //const refresh2 = React.useCallback(() => {
  //  if (isLoading) return;
  //  setIsLoading(true);
  //  fetch('api/get/' + PROGRESS)
  //    .then((response) => response.json())
  //    .then((data) => {
  //      setProgress(data as Todo[]);
  //    });
  //}, [isLoading]);
  //
  //const refresh3 = React.useCallback(() => {
  //  if (isLoading) return;
  //  setIsLoading(true);
  //  fetch('api/get/' + DONE)
  //    .then((response) => response.json())
  //    .then((data) => {
  //      setDone(data as Todo[]);
  //    })
  //    .finally(() => setIsLoading(false));
  //}, [isLoading]);

  //const cols = React.useMemo(
  //  () =>
  //    columnsDefinition.reduce((acc, name) => {
  //      acc[name] = prepareColumn(todos, name);
  //      return acc;
  //    }, {} as { [key: string]: Todo[] }),
  //  [todos]
  //);

  const onDragEnd = (result: DropResult) => {
    const dst = result.destination;
    const src = result.source;

    if (!dst) {
      return;
    }

    //if (src.droppableId === dst.droppableId) {
    //  console.log(src.droppableId);
    //  const currentCol = cols?.[src.droppableId as keyof typeof cols];
    //  if (currentCol == null) {
    //    return;
    //  }
    //  const dstObj = currentCol[dst.index];
    //  const srcObj = currentCol[src.index];
    //
    //  onUpdate(dstObj.id, dstObj.title, dstObj.columnName, srcObj.nextId);
    //  onUpdate(srcObj.id, srcObj.title, srcObj.columnName, dstObj.nextId);
    //} else {
    //  const srcObj = cols?.[src.droppableId as keyof typeof cols]?.[src.index];
    //  onUpdate(srcObj.id, srcObj.title, dst.droppableId, dst.index);
    //}
  };

  useEffect(() => {
    refresh();
    //refresh2();
    //refresh3();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    if (todoItem !== undefined && todoItem.trim().length !== 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: todoItem, columnName: TODO, nextId: todoCol[0].id }),
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
    (itemId: number, itemTitle: string, itemColumnName: string, nextId: number) => {
      if (itemTitle !== undefined && itemTitle.trim().length !== 0) {
        fetch('api/put', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: itemId,
            title: itemTitle,
            columnName: itemColumnName,
            nextId: nextId,
          }),
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
            <Column onRemove={onRemove} colName={TODO} titleColumn={'TODO'} todos={todoCol} onUpdate={onUpdate} />
          </Col>
          <Col span={8}>
            <Column
              onRemove={onRemove}
              colName={PROGRESS}
              titleColumn={'IN PROGRESS'}
              todos={progressCol}
              onUpdate={onUpdate}
            />
          </Col>
          <Col span={8}>
            <Column onRemove={onRemove} colName={DONE} titleColumn={'DONE'} todos={doneCol} onUpdate={onUpdate} />
          </Col>
        </Row>
      </DragDropContext>
    </>
  );
}
