import React, {render, screen, fireEvent} from '@testing-library/react-native';
import * as TodosContext from '../context/todosContext';
import Todos from './Todos';

describe('Todos component', () => {
  it('should enable or disable online mode', () => {
    render(<Todos />);

    const button = screen.getByTestId('todos-toggle-online-mode');

    expect(button).toHaveTextContent('Online');

    fireEvent.press(screen.getByTestId('todos-toggle-online-mode'));

    expect(button).toHaveTextContent('Offline');
  });

  it('should display loader when loading data', () => {
    const spy = jest.spyOn(TodosContext, 'useTodosContext');
    spy.mockReturnValue({
      isFetching: false,
      isLoading: true,
      refetch: () => ({}),
    });

    render(<Todos />);

    const activityIndicator = screen.getByTestId(
      'todo-loading-activity-indicator',
    );

    expect(activityIndicator).toBeOnTheScreen();
    spy.mockClear();
  });

  it('should display loader when fetching data', () => {
    const spy = jest.spyOn(TodosContext, 'useTodosContext');
    spy.mockReturnValue({
      isFetching: true,
      isLoading: false,
      refetch: () => ({}),
    });

    render(<Todos />);

    const activityIndicator = screen.getByTestId('todo-activity-indicator');

    expect(activityIndicator).toBeOnTheScreen();
    spy.mockClear();
  });

  it('should display no data', () => {
    const spy = jest.spyOn(TodosContext, 'useTodosContext');
    spy.mockReturnValue({
      isFetching: false,
      isLoading: false,
      refetch: () => ({}),
    });

    render(<Todos />);

    const text = screen.getByTestId('todos-no-data');

    expect(text).toBeOnTheScreen();
    spy.mockClear();
  });

  it('should display a todo list', () => {
    const spy = jest.spyOn(TodosContext, 'useTodosContext');
    spy.mockReturnValue({
      isFetching: false,
      isLoading: false,
      refetch: () => ({}),
      data: {
        title: 'My test',
        todos: [{title: 'todo1'}],
      },
    });

    render(<Todos />);

    const title = screen.getByTestId('todos-title');
    const todoTitle = screen.getByTestId('todo-0');

    expect(title).toHaveTextContent('My test');
    expect(todoTitle).toHaveTextContent('todo1');
    spy.mockClear();
  });

  it('should refetch data when triggered', () => {
    const spy = jest.spyOn(TodosContext, 'useTodosContext');
    const refetchMock = jest.fn();
    spy.mockReturnValue({
      isFetching: false,
      isLoading: false,
      refetch: refetchMock,
    });

    render(<Todos />);

    fireEvent.press(screen.getByTestId('todos-refresh'));

    expect(refetchMock).toHaveBeenCalledTimes(1);
    spy.mockClear();
  });
});
