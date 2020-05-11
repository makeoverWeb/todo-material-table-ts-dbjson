import { ActionType, ITodoItem, ReducerState } from "../interfaces";
import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

const { REACT_APP_API_URL } = process.env;

const _dispatch = (
  type: ActionType,
  payload: ITodoItem | any,
  dispatch: Dispatch
) => {
  dispatch({ type, payload });
};

export const getTodoListAction = (): ThunkAction<
  any,
  ReducerState,
  any,
  any
> => async (dispatch: Dispatch) => {
  try {
    _dispatch("SET_LOADING_STATE", true, dispatch);

    const response: Response = await fetch(`${REACT_APP_API_URL}`);
    const result = await response.json();

    _dispatch("FETCH_TODO_LIST", result, dispatch);
  } catch (error) {
    _dispatch("FETCH_TODO_DELETE", error.message, dispatch);
  } finally {
    _dispatch("SET_LOADING_STATE", false, dispatch);
  }
};

export const addTodoAction = (
  payload: ITodoItem
): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
  try {
    _dispatch("SET_LOADING_STATE", true, dispatch);

    const response: Response = await fetch(`${REACT_APP_API_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    _dispatch("FETCH_TODO_ADD", result, dispatch);
  } catch (error) {
    _dispatch("FETCH_TODO_DELETE", error.message, dispatch);
  } finally {
    _dispatch("SET_LOADING_STATE", false, dispatch);
  }
};

export const updateTodoAction = (
  payload: ITodoItem
): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
  const { id } = payload;

  try {
    _dispatch("SET_LOADING_STATE", true, dispatch);

    const response: Response = await fetch(`${REACT_APP_API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();

    _dispatch("FETCH_TODO_UPDATE", result, dispatch);
  } catch (error) {
    _dispatch("FETCH_TODO_DELETE", error.message, dispatch);
  } finally {
    _dispatch("SET_LOADING_STATE", false, dispatch);
  }
};
export const deleteTodoAction = (
  payload: ITodoItem
): ThunkAction<any, ReducerState, any, any> => async (dispatch: Dispatch) => {
  const { id } = payload;

  try {
    _dispatch("SET_LOADING_STATE", true, dispatch);

    await fetch(`${REACT_APP_API_URL}/${id}`, {
      method: "DELETE",
    });

    _dispatch("FETCH_TODO_DELETE", payload, dispatch);
  } catch (error) {
    _dispatch("FETCH_TODO_DELETE", error.message, dispatch);
  } finally {
    _dispatch("SET_LOADING_STATE", false, dispatch);
  }
};
