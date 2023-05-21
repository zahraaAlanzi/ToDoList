function ToDoItem({ item, onDelete }) {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <div style={{ flexGrow: 1 }}>{item.title}</div>
      <button onClick={() => onDelete(item.id)}>Delete</button>
    </div>
  );
}

export default ToDoItem;
