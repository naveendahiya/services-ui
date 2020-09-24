import React, { useEffect, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import TaskCard from "./taskcard";
import { useDispatch, useSelector } from "react-redux";
import {getAllTasks,  addTasks} from '../actions/taskAction';
import {setLoading, setPage} from '../actions/paginationAction';
import request from "superagent";
import debounce from "lodash.debounce";

const Tasks = () => {
  const tasks = useSelector(state => state.taskReducer.tasks);
  const current = useSelector(state => state.paginationReducer.page);
  const loading = useSelector((state) => state.paginationReducer.loading);
  const count = useSelector(state => state.taskReducer.count)
  const [more, setMore] = useState(true);
  const dispatch = useDispatch();

  window.onscroll = debounce(() => {
    let height = document.getElementById('tasks-container').clientHeight;
    if (!loading || !more) {
        return;
    }

    if (
      window.innerHeight + document.documentElement.scrollTop
      === height
    ){
      dispatch(
       setPage(current+1)
      );
      dispatch(
        addTasks(current+1)
      )
    }
  }, 100);


  useEffect(() => {
    dispatch(
        getAllTasks(1)
    )
  }, [])


  useEffect(() => {
     if(count == tasks.length){
         setMore(false)
         dispatch(
             setLoading(false)
         )
     }else{
         setMore(true)
         dispatch(
            setLoading(true)
        )
     }
  }, [count, tasks.length]);

  const List = () => {
    const products = tasks.map((task) =>
    <TaskCard  task={task} key={task.title} />
)
return (
    products
)
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container id='tasks-container' maxWidth="xl">
        <Typography
          component="div"
          style={{
            backgroundColor: "white",
            height: "fit-content",
            marginTop: "0",
            paddingTop: "70px",
            paddingBottom: "10px",
            minHeight: "100vh",
          }}
        >
          {List()}
          { loading ? <div className='pagination-loading'>loading.......</div> : ''}
          { more == false ? <div className='pagination-end'>no more tasks avaliable</div> : ''}
        </Typography>
      </Container>
    </React.Fragment>
  );
};

export default Tasks;
