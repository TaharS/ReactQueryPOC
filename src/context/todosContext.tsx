import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import useGetTodos from '../hooks/useGetTodos';
import {TodoMultiProps} from '../types/todos';

const TodoContext = createContext<TodoMultiProps>({
  refetch: () => {},
  isFetching: false,
  isLoading: false,
});

function TodoProvider({children}: PropsWithChildren): JSX.Element {
  const query = useGetTodos();

  const context: TodoMultiProps = useMemo(
    () => ({
      data: query.data,
      refetch: query.refetch,
      isFetching: query.isFetching,
      isLoading: query.isLoading,
    }),
    [query],
  );

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
}

export function useTodosContext() {
  return useContext(TodoContext);
}

export function useTodosProvider() {
  return TodoProvider;
}
