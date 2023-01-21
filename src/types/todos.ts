export interface TodoMultiProps {
  data?: TodoProps;
  refetch: () => void;
  isLoading: boolean;
  isFetching: boolean;
}

export interface TodoProps {
  title: string;
  todos: Array<{title: string}>;
}
