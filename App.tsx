/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient} from '@tanstack/react-query';
import {PersistQueryClientProvider} from '@tanstack/react-query-persist-client';
import {createAsyncStoragePersister} from '@tanstack/query-async-storage-persister';
import TodoScreen from './src/screens/TodosScreen';

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

function App(): JSX.Element {
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{persister: asyncStoragePersister}}>
      <TodoScreen />
    </PersistQueryClientProvider>
  );
}

export default App;
