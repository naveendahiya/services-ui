import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
import Header from './components/header';
import Tasks from './components/tasklist';
import TaskDetail from "./components/taskDetail";
import TaskForm from "./components/taskForm";
import Home from './components/home';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css'


ReactDOM.render(
  <React.StrictMode>
    <Header />
    <TaskDetail />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
