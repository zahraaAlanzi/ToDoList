import axios from "axios";
import { useEffect, useState } from "react";
import ToDoItem from "./ToDoItem";
import NoData from "./NoData";
import ToDoItemsAddForm from "./ToDoItemsAddForm";
import useToDo from "./hooks/use-to-do";
import "./ToDoItemsList.css";

function ToDoItemsList() {
  const { toDos, loading, addToDo, loadToDos, error, deleteToDo } = useToDo();
  const [title, setTitle] = useState("");

  useEffect(() => {
    console.log("Loading Data");
    loadToDos();
  }, []);

  const handleAddToDoItem = (e) => {
    addToDo(title, () => setTitle(""));
  };
  const handleDeleteToDoItem = (id) => {
    console.log("on sucess");
    deleteToDo(id, () => {
      loadToDos();
    });
  };

  return error ? (
    <p
      style={{
        color: "red",
      }}
    >
      {error.message}
    </p>
  ) : loading ? (
    <label>loading</label>
  ) : toDos.length === 0 ? (
    <NoData />
  ) : (
    <>
      <ToDoItemsAddForm
        title={title}
        onTitleChange={(value) => setTitle(value)}
        onAddToDoItem={handleAddToDoItem}
      >
        {" "}
      </ToDoItemsAddForm>
      <div className="to-do-list">
        <ul>
          {toDos.map((toDo) => (
            <li key={toDo.id}>
              <ToDoItem item={toDo} onDelete={handleDeleteToDoItem}></ToDoItem>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoItemsList;
