import axios from "axios";
import { useState } from "react";

const useToDo = () => {
  const [loading, setLoading] = useState(true);
  const [toDos, setToDos] = useState([]);
  const [error, setError] = useState(null);
  const loadToDos = () => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:3000/tasks")
      .then(function (response) {
        setToDos(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  };

  const addToDo = (title, onSuccess) => {
    axios
      .post("http://localhost:3000/tasks", {
        title: title,
      })
      .then((response) => {
        loadToDos();
        onSuccess && onSuccess();
      })
      .catch((error) => {
        setError(error);
      });
  };
   const deleteToDo =(id,onDelete)=>
    axios.delete('http://localhost:3000/tasks/' + id)
         .then((response) =>{
          console.log("deletet successful")
          onDelete()
        }
           )
  return { toDos, addToDo, loadToDos, loading, error, deleteToDo };
};

export default useToDo;
