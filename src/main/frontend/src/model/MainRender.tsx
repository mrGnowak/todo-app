import React, { useCallback, useEffect, useState } from 'react';
import '.././styles/App.css';
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
  const [todoCol, setTodoCol] = useState<Todo[]>([]);
  const [progressCol, setProgressCol] = useState<Todo[]>([]);
  const [doneCol, setDoneCol] = useState<Todo[]>([]);

  const [todoItem, setTodoItem] = useState<string | undefined>();
  const onChange = (e: React.FormEvent<HTMLInputElement>) => setTodoItem(e.currentTarget.value);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refresh = React.useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    fetch('api/get/' + TODO)
      .then((response) => response.json())
      .then((data) => {
        setTodoCol(data as Todo[]);
      });
    fetch('api/get/' + PROGRESS)
      .then((response) => response.json())
      .then((data) => {
        setProgressCol(data as Todo[]);
      });
    fetch('api/get/' + DONE)
      .then((response) => response.json())
      .then((data) => {
        setDoneCol(data as Todo[]);
      })
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  const updateDroppable = (srcId: number, dstId: number, srcColname: string) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('api/get/' + srcId + '/' + dstId + '/' + srcColname, requestOptions)
      .then((response) => response.json())
      .finally(() => refresh());
  };

  const onDragEnd = (result: DropResult) => {
    const dst = result.destination;
    const src = result.source;

    if (!dst || src === dst) {
      return;
    }
    let dstId = 0;
    let srcId = 0;

    let srcObj: Todo;
    let dstObj: Todo | undefined;

    if (src.droppableId === TODO) {
      srcObj = todoCol[src.index];
      srcId = srcObj.id;
    }
    if (src.droppableId === PROGRESS) {
      srcObj = progressCol[src.index];
      srcId = srcObj.id;
    }
    if (src.droppableId === DONE) {
      srcObj = doneCol[src.index];
      srcId = srcObj.id;
    }
    if (dst.droppableId === TODO) {
      dstObj = todoCol[dst.index];
      if (dstObj !== undefined) {
        dstId = dstObj.id;
      } else {
        dstId = -1;
      }
    }
    if (dst.droppableId === PROGRESS) {
      dstObj = progressCol[dst.index];
      if (dstObj !== undefined) {
        dstId = dstObj.id;
      } else {
        dstId = -1;
      }
    }
    if (dst.droppableId === DONE) {
      dstObj = doneCol[dst.index];
      if (dstObj !== undefined) {
        dstId = dstObj.id;
      } else {
        dstId = -1;
      }
    }
    if (dstId === srcId) {
      return;
    }
    updateDroppable(dstId, srcId, dst.droppableId);
    //refresh();
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
        body: JSON.stringify({ title: todoItem, columnName: TODO, nextId: todoCol[0]?.id ?? -1 }),
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
