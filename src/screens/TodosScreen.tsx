import React from 'react';
import Todos from '../components/Todos';
import {useTodosProvider} from '../context/todosContext';

function TodoScreen(): JSX.Element {
  const TodoProvider = useTodosProvider();
  return (
    <TodoProvider>
      <Todos />
    </TodoProvider>
  );
}

export default TodoScreen;
