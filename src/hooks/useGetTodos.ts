import {useQuery, UseQueryResult} from '@tanstack/react-query';
import {TodoProps} from '../types/todos';

const dummyTodos = [{title: 'Todo1'}, {title: 'Todo2'}, {title: 'Todo3'}];

export default function useGetTodos(): UseQueryResult<TodoProps> {
  return useQuery({
    queryKey: ['todos'],
    queryFn: () => {
      const rand = Math.ceil(Math.random() * 1000);
      return new Promise(resolve =>
        setTimeout(
          () => resolve({title: 'Todos title ' + rand, todos: dummyTodos}),
          500,
        ),
      );
    },
    enabled: false,
  });
}
