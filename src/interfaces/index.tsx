export type TStatus = "TODO" | "PROCESS" | "COMPLETED";

export type ActionType =
  | "FETCH_TODO_LIST"
  | "FETCH_TODO_UPDATE"
  | "FETCH_TODO_ADD"
  | "FETCH_TODO_DELETE"
  | "FETCH_TODO_ERROR"
  | "SET_LOADING_STATE";

export interface ITodoItem {
  id: number;
  title: string;
  description?: string;
  dueDate?: Date;
  status?: TStatus;
}

export interface ReducerState {
  todos: ITodoItem[];
  isLoading: boolean;
  error: string | null;
}

export interface ReducerAction {
  type: ActionType;
  payload: ITodoItem | any;
}
