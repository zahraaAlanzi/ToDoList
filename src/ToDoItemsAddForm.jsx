import axios from "axios";
import { useState } from "react";

function ToDoItemsAddForm({ title, onTitleChange, onAddToDoItem }) {
  return (
    
    <div>
    
     <input
        placeholder="Title of ToDo Item"
        type="text"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <button type="button" onClick={onAddToDoItem}>
        Add To Do
      </button>
      
    </div>
  );
}

export default ToDoItemsAddForm;
