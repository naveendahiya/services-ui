import React, {useEffect, useState} from "react";
import { useDispatch, useSelector } from 'react-redux';
import {getTaskQuestions} from '../actions/questionAction';
import QuestionCard from './cards/questionCard';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import QuestionCreate from './forms/questionForm';
import { Button, Card, Divider, Label, Form, TextArea } from "semantic-ui-react";

const Questions = (props) => {
  const [hide, setHide] = useState(false);
  const questions = useSelector(state => state.questionReducer.questions);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(
         getTaskQuestions(props.id)
      )
  }, []);

  const QuestionList = () => {
      let Questions = [];
      if(questions.length>0){
        Questions = questions.map((question) => 
             <QuestionCard question={question} />
        )
      }else{
        Questions = <div className='pagination-end'>No questions have been asked Yet.</div>
      }
      return(
          Questions
      )
  };

  const toggleQuestions = (string) => {
    let bool = false;
    switch(string){
      case 'hide':
        bool = true;
        break;
      case 'show':
        bool = false;
        break;
      default:
        bool = false;
        break;
    }
    setHide(bool);
  }


  return (
    <>
    <div className='outer question-heading-box'>
    <span>QUESTIONS</span>
    <div className="hide-button-box">
          {hide ? <div onClick={() => toggleQuestions('show')} className='hide-button'><ArrowDropDownIcon className='up-hide-icon' /></div> : <div onClick={() => toggleQuestions('hide')} className='hide-button'><ArrowDropUpIcon className='up-hide-icon'  /></div>}
    </div>
    </div>
    {localStorage.getItem('user_id') == props.creater ? '' : <QuestionCreate /> }
    <Divider />
    <div style={{display: hide == true ? 'none' : 'block'}} className='questions-list'>
       {QuestionList()}
    </div>
    </>
  );
};

export default Questions;
