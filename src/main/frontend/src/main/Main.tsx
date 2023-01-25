import React, { useState } from 'react';
import { DragDropContext, Draggable } from 'react-beautiful-dnd';
import { StrictModeDroppable } from './StrictModeDroppable';

interface Todo {
  id: string;
  content: string;
  status: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: '1', content: 'Todo 1', status: 'To Do' },
    { id: '2', content: 'Todo 2', status: 'To Do' },
    { id: '3', content: 'Todo 3', status: 'Done' },
    { id: '4', content: 'Todo 4', status: 'Done' },
    { id: '5', content: 'Todo 5', status: 'To Do' },
    { id: '6', content: 'Todo 6', status: 'To Do' },
    { id: '7', content: 'Todo 7', status: 'Done' },
    { id: '8', content: 'Todo 8', status: 'Done' },
  ]);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    const newTodos = Array.from(todos);
    const index = newTodos.findIndex((todo) => todo.id === result.draggableId);

    const [removed] = newTodos.splice(index, 1);
    if (result.destination.droppableId === 'to-do') {
      removed.status = 'To Do';
    } else if (result.destination.droppableId === 'done') {
      removed.status = 'Done';
    }
    newTodos.splice(result.destination.index, 0, removed);
    setTodos(newTodos);
  };

  const handleAddTodo = (content: string) => {
    const newTodo = {
      id: Date.now().toString(),
      content,
      status: 'To Do',
    };
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>Todo App</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          <div className="column">
            <h2>To Do</h2>
            <StrictModeDroppable droppableId="to-do">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todos
                    .filter((todo) => todo.status === 'To Do')
                    .map((todo, index) => (
                      <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            {todo.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </div>
          <div className="column">
            <h2>Done</h2>
            <StrictModeDroppable droppableId="done">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todos
                    .filter((todo) => todo.status === 'Done')
                    .map((todo, index) => (
                      <Draggable key={todo.id} draggableId={todo.id} index={index}>
                        {(provided) => (
                          <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                            {todo.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </StrictModeDroppable>
          </div>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo((e.target as any).todo.value);
            (e.target as any).todo.value = '';
          }}
        >
          <input type="text" name="todo" placeholder="Add a Todo" />
          <button type="submit">Add Todo</button>
        </form>
      </DragDropContext>
    </div>
  );
};

//  id: string;
//  content: string;
//  status: string;
//}
//
//interface TodoListProps {
//  tasks: Task[];
//}
//
//const TodoList: React.FC<TodoListProps> = ({ tasks }) => {
//  const [state, setState] = useState<Task[]>(tasks);
//
//  const onDragEnd = (result: any) => {
//    if (!result.destination) {
//      return;
//    }
//    const newTasks = Array.from(state);
//    const [removed] = newTasks.splice(result.source.index, 1);
//    newTasks.splice(result.destination.index, 0, removed);
//    setState(newTasks);
//  };
//  const handleAddTodo = (content: string) => {
//    const newState = {
//      id: Date.now().toString(),
//      content,
//      status: 'To Do',
//    };
//    setState([...state, newState]);
//  };
//  const handleChecked = (id: string) => {
//    const newTodos = state.map((state) => {
//      if (state.id === id) {
//        state.status = state.status === 'To Do' ? 'Done' : 'To Do';
//      }
//      return state;
//    });
//    setState(newTodos);
//  };
//
//  return (
//    <DragDropContext onDragEnd={onDragEnd}>
//      <StrictModeDroppable droppableId={'To Do'}>
//        {(provided) => (
//          <div {...provided.droppableProps} ref={provided.innerRef}>
//            {state.map((task, index) => (
//              <Draggable key={task.id} draggableId={task.id} index={index}>
//                {(provided) => (
//                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//                    <div>
//                      <input type="checkbox" id={task.id} />
//                      <label htmlFor={task.id}>{task.content}</label>
//                    </div>
//                  </div>
//                )}
//              </Draggable>
//            ))}
//            {provided.placeholder}
//          </div>
//        )}
//      </StrictModeDroppable>
//      <StrictModeDroppable droppableId={'Done'}>
//        {(provided) => (
//          <div {...provided.droppableProps} ref={provided.innerRef}>
//            {state.map((task, index) => (
//              <Draggable key={task.id} draggableId={task.id} index={index}>
//                {(provided) => (
//                  <div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
//                    <div>
//                      <label htmlFor={task.id}>{task.content}</label>
//                    </div>
//                  </div>
//                )}
//              </Draggable>
//            ))}
//            {provided.placeholder}
//          </div>
//        )}
//      </StrictModeDroppable>
//    </DragDropContext>
//  );
//};
//
//const App: React.FC = () => {
//  const tasks: Task[] = [
//    { id: '1', content: 'Take out the trash', status: 'To Do' },
//    { id: '2', content: 'Walk the dog', status: 'To Do' },
//    { id: '3', content: 'Do the dishes', status: 'Done' },
//    { id: '4', content: 'Buy groceries', status: 'Done' },
//  ];
//
//  return (
//    <div>
//      <h1>To-Do List</h1>
//      <TodoList tasks={tasks} />
//    </div>
//  );
//};
export default App;
