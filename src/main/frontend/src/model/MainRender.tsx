import React, { useCallback, useEffect, useState } from 'react';
import '.././App.css';
import { Button, Col, Row, Typography, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Todo } from './types';
import Column from './Column';
import { LinkedList } from './linkedList/LinkedList';

const TODO = 'to-do';
const DONE = 'done';
const PROGRESS = 'progress';

function prepareColumn(todos: Todo[], colName: string) {
  return todos.filter((todo) => todo.columnName === colName).sort((a, b) => a.posInCol - b.posInCol);
}

const columnsDefinition = [TODO, DONE, PROGRESS];

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

  const cols = React.useMemo(
    () =>
      columnsDefinition.reduce((acc, name) => {
        acc[name] = prepareColumn(todos, name);
        return acc;
      }, {} as { [key: string]: Todo[] }),
    [todos]
  );

  const onDragEnd = (result: DropResult) => {
    const dst = result.destination;
    const src = result.source;

    if (!dst) {
      return;
    }

    if (src.droppableId === dst.droppableId) {
      console.log(src.droppableId);
      const currentCol = cols?.[src.droppableId as keyof typeof cols];
      if (currentCol == null) {
        return;
      }
      const dstObj = currentCol[dst.index];
      const srcObj = currentCol[src.index];

      onUpdate(dstObj.id, dstObj.title, dstObj.columnName, srcObj.posInCol);
      onUpdate(srcObj.id, srcObj.title, srcObj.columnName, dstObj.posInCol);
    } else {
      const srcObj = cols?.[src.droppableId as keyof typeof cols]?.[src.index];
      onUpdate(srcObj.id, srcObj.title, dst.droppableId, dst.index);
    }
  };

  useEffect(() => {
    refresh();
    //LinkedListFiltr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const save = () => {
    if (todoItem !== undefined && todoItem.trim().length !== 0) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: todoItem, columnName: TODO, posInCol: todos.length }),
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
    (itemId: number, itemTitle: string, itemColumnName: string, positionInColumn: number) => {
      if (itemTitle !== undefined && itemTitle.trim().length !== 0) {
        fetch('api/put', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: itemId,
            title: itemTitle,
            columnName: itemColumnName,
            posInCol: positionInColumn,
          }),
        })
          .then((response) => response.json())
          .then(() => refresh());
      }
    },
    [refresh]
  );
  const linkedList = new LinkedList<Todo>();
  const linkedListTodo = new LinkedList<Todo>();
  const linkedListProgress = new LinkedList<Todo>();
  const linkedListDone = new LinkedList<Todo>();

  //function LinkedListFiltr() {
  for (let i = 0; i < todos.length; i++) {
    //let TodoTemp = 0;
    //let ProgressTemp = 0;
    //let DoneTemp = 0;
    if (todos[i].columnName === TODO) {
      linkedListTodo.insertInBegin(todos[i]);
      //todos[i].posInCol = TodoTemp;
      //TodoTemp += 1;
    } else if (todos[i].columnName === PROGRESS) {
      linkedListProgress.insertInBegin(todos[i]);
      //todos[i].posInCol = ProgressTemp;
      //ProgressTemp += 1;
    } else if (todos[i].columnName === DONE) {
      linkedListDone.insertInBegin(todos[i]);
      //todos[i].posInCol = DoneTemp;
      //DoneTemp += 1;
    }
    linkedList.insertInBegin(todos[i]);
    todos[i].posInCol = i;
    //}
  }
  const newLinkedListTodo = JSON.stringify(linkedListTodo);
  const newLinkedListProgress = JSON.stringify(linkedListProgress);
  const newLinkedListDone = JSON.stringify(linkedListDone);

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
            <Column onRemove={onRemove} colName={TODO} titleColumn={'TODO'} todos={cols[TODO]} onUpdate={onUpdate} />
          </Col>
          <Col span={8}>
            <Column
              onRemove={onRemove}
              colName={PROGRESS}
              titleColumn={'IN PROGRESS'}
              todos={cols[PROGRESS]}
              onUpdate={onUpdate}
            />
          </Col>
          <Col span={8}>
            <Column onRemove={onRemove} colName={DONE} titleColumn={'DONE'} todos={cols[DONE]} onUpdate={onUpdate} />
          </Col>
        </Row>
      </DragDropContext>
      <div>TODO {newLinkedListTodo} koniec</div>
      <div>PROGRESS {newLinkedListProgress} koniec</div>
      <div>DONE {newLinkedListDone} koniec</div>
    </>
  );
}
