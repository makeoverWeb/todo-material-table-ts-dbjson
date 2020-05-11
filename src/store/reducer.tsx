import { ReducerState, ReducerAction, ITodoItem } from "../interfaces";

const initialState: ReducerState = {
  todos: [],
  isLoading: false,
  error: null,
};

export const reducer = (
  state: ReducerState = initialState,
  action: ReducerAction
): ReducerState => {
  const { type, payload } = action;
  switch (type) {
    case "FETCH_TODO_LIST":
      return { ...state, todos: payload };
    case "FETCH_TODO_ADD":
      return { ...state, todos: state.todos.concat(payload) };
    case "FETCH_TODO_UPDATE":
      return {
        ...state,
        todos: state.todos.map(
          (item: ITodoItem): ITodoItem => {
            if (payload.id === item.id) {
              return { ...item, ...payload };
            }
            return item;
          }
        ),
      };
    case "FETCH_TODO_DELETE":
      return {
        ...state,
        todos: state.todos.filter((item: ITodoItem) => {
          return item.id !== payload.id;
        }),
      };
    case "SET_LOADING_STATE":
      return {
        ...state,
        isLoading: payload,
      };
    case "FETCH_TODO_ERROR":
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

export default reducer;
