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

  const updateDroppable = (srcId: number, dstId: number, dstColName: string) => {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    fetch('api/get/' + srcId + '/' + dstId + '/' + dstColName, requestOptions)
      .then((response) => response.json())
      .finally(() => refresh());
  };

  const onDragEnd = (result: DropResult) => {
    const dst = result.destination;
    const src = result.source;

    const dstColName = dst?.droppableId;

    if (!dstColName || !dst || dst?.index == null || src === dst) {
      return;
    }

    function getCol(colName: string) {
      switch (colName) {
        case 'to-do':
          return todoCol;
        case 'progress':
          return progressCol;
        case 'done':
          return doneCol;
      }
      return undefined;
    }

    const srcCol = getCol(src.droppableId);
    const dstCol = getCol(dst.droppableId);

    if (srcCol == null || dstCol == null) {
      return;
    }

    const srcId = srcCol?.[src.index]?.id;

    const reorderFromTop = dst?.droppableId === src?.droppableId && src.index < dst.index;
    const dstId = dstCol?.[dst.index + (reorderFromTop ? 1 : 0)]?.id ?? -1;

    updateDroppable(srcId, dstId, dstColName);
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
