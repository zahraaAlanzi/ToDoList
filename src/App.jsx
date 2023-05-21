import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ToDoItemsList from "./ToDoItemsList";
import './App.css';
import signIn from './signIn';
import signUp from './signUp';
import AuthDetails from './AuthDetails';


function App() {

  return <div>
    <signIn />
      <signUp />
      <AuthDetails />
        <ToDoItemsList></ToDoItemsList>;
  </div>

}

export default App;
