import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ReducerState, ITodoItem } from "./interfaces";
import {
  getTodoListAction,
  addTodoAction,
  updateTodoAction,
  deleteTodoAction,
} from "./store/actions";
import MaterialTable from "material-table";

function App() {
  const dispatch = useDispatch();

  const { todos, isLoading, error } = useSelector(
    (state: ReducerState) => state
  );

  useEffect(() => {
    dispatch(getTodoListAction());
  }, [dispatch]);

  const columns = [
    {
      title: "Title",
      field: "title",
    },
    {
      title: "Discription",
      field: "discription",
    },
    {
      title: "Due Date",
      field: "dueDate",
      type: "date" as any,
    },
    {
      title: "Status",
      field: "status",
      lookup: { TODO: "TODO", PROCESS: "PROCESS", COMPLETED: "COMPLETED" },
      initialEditValue: "TODO",
    },
  ];

  const addTodo = (newData: ITodoItem): Promise<void> => {
    return new Promise(async (resolve) => {
      await dispatch(addTodoAction(newData));
      resolve();
    });
  };

  const updateTodo = (newData: ITodoItem): Promise<void> => {
    return new Promise(async (resolve) => {
      await dispatch(updateTodoAction(newData));
      resolve();
    });
  };

  const deleteTodo = (newData: ITodoItem): Promise<void> => {
    return new Promise(async (resolve) => {
      await dispatch(deleteTodoAction(newData));
      resolve();
    });
  };

  return (
    <div className="App">
      <MaterialTable
        title={error || "Todo List"}
        data={todos}
        isLoading={isLoading}
        columns={columns}
        options={{ filtering: true, sorting: true }}
        editable={{
          onRowAdd: addTodo,
          onRowUpdate: updateTodo,
          onRowDelete: deleteTodo,
        }}
        style={{ maxWidth: "960px", margin: "100px auto 0" }}
      />
    </div>
  );
}

export default App;
