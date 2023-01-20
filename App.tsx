/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {
  createContext,
  type PropsWithChildren,
  useContext,
  useState,
  useMemo,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, Button, SafeAreaView, Text} from 'react-native';
import {
  useQuery,
  onlineManager,
  QueryClient,
  UseQueryResult,
} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';

interface TodoMultiProps {
  data?: TodoProps;
  refetch: () => void;
  isLoading: boolean;
  isFetching: boolean;
}
interface TodoProps {
  title: string;
  todos: Array<{title: string}>;
}

const dummyTodos = [{title: 'Todo1'}, {title: 'Todo2'}, {title: 'Todo3'}];

function useGetTodos(): UseQueryResult<TodoProps> {
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

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  throttleTime: 100,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 30,
    },
  },
});

const TodoContext = createContext<TodoMultiProps>({
  refetch: () => {},
  isFetching: false,
  isLoading: false,
});

function App(): JSX.Element {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <TodoScreen />
    </PersistQueryClientProvider>
  );
}

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

function useTodosContext() {
  return {
    TodoProvider,
    context: useContext(TodoContext),
  };
}

function TodoScreen(): JSX.Element {
  const {TodoProvider: Provider} = useTodosContext();
  return (
    <Provider>
      <Todos />
    </Provider>
  );
}

function Todos(): JSX.Element {
  const [fakeOnline, setFakeOnline] = useState(true);
  const {
    context: {data, refetch, isFetching, isLoading},
  } = useTodosContext();

  onlineManager.setOnline(fakeOnline);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const renderData = () => {
    if (!data) {
      return <Text>No Data</Text>;
    }

    return (
      <>
        <Text>{data.title}</Text>
        {data.todos?.map((todo, id) => (
          <Text key={id}>{todo.title}</Text>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView>
      {isFetching ? <ActivityIndicator /> : null}
      {renderData()}
      <Button
        onPress={() => {
          refetch();
        }}
        title="Refresh"
      />
      <Button
        onPress={() => {
          setFakeOnline(!fakeOnline);
        }}
        title={`${fakeOnline ? 'Online' : 'Offline'}`}
      />
    </SafeAreaView>
  );
}

export default App;
