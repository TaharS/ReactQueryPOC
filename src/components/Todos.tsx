import React, {useState} from 'react';
import {ActivityIndicator, Button, SafeAreaView, Text} from 'react-native';
import {onlineManager} from '@tanstack/react-query';
import {useTodosContext} from '../context/todosContext';

function Todos(): JSX.Element {
  const [fakeOnline, setFakeOnline] = useState(true);
  const {data, refetch, isFetching, isLoading} = useTodosContext();

  onlineManager.setOnline(fakeOnline);

  if (isLoading) {
    return <ActivityIndicator testID="todo-loading-activity-indicator" />;
  }

  const renderData = () => {
    if (!data) {
      return <Text testID="todos-no-data">No Data</Text>;
    }

    return (
      <>
        <Text testID="todos-title">{data.title}</Text>
        {data.todos?.map((todo, id) => (
          <Text key={id} testID={`todo-${id}`}>
            {todo.title}
          </Text>
        ))}
      </>
    );
  };

  return (
    <SafeAreaView>
      {isFetching ? (
        <ActivityIndicator testID="todo-activity-indicator" />
      ) : null}
      {renderData()}
      <Button
        testID="todos-refresh"
        onPress={() => {
          refetch();
        }}
        title="Refresh"
      />
      <Button
        testID="todos-toggle-online-mode"
        onPress={() => {
          setFakeOnline(!fakeOnline);
        }}
        title={`${fakeOnline ? 'Online' : 'Offline'}`}
      />
    </SafeAreaView>
  );
}

export default Todos;
