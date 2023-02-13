import Title from 'antd/es/typography/Title';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';
import TodoItem from './TodoItem';
import { Todo } from './types';

type Props = {
  onRemove: (todoId: number) => void;
  onUpdate: (todoId: number, title: string, itemColumnName: string, positionInColumn: number) => void;
  colName: string;
  titleColumn: string;
  todos: Todo[];
};

export default function Column({ onRemove, colName, titleColumn, todos, onUpdate }: Props) {
  return (
    <>
      <div className="rcorners2">
        <div className="rcorners1" style={{ padding: '10px' }}>
          <Title level={3}>{titleColumn}</Title>
        </div>
        <StrictModeDroppable droppableId={colName}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div className="rcorners3">
                <div style={{ padding: '10px' }}>
                  <div>
                    {todos.map((todo, index) => (
                      <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            <TodoItem item={todo} onRemove={onRemove} onUpdate={onUpdate} index={index} />
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
      </div>
    </>
  );
}
