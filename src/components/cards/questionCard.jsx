import React, { useState } from "react";
import AnswerCreate from "../forms/answerForm";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Divider } from "semantic-ui-react";
import EditIcon from "@material-ui/icons/Edit";
import AnswerUpdate from "../forms/answerUpdateForm";

const QuestionCard = (props) => {
  const [hide, setHide] = useState(false);
  const [update, setUpdate] = useState(false);

  const toggleAnswer = (string) => {
    let bool = false;
    switch (string) {
      case "hide":
        bool = true;
        break;
      case "show":
        bool = false;
        break;
      default:
        bool = false;
        break;
    }
    setHide(bool);
  };

  const toggelEdit = (string) => {
    switch (string) {
      case "hide":
        setUpdate(false);
        break;
      case "show":
        setUpdate(true);
        break;
      default:
        setUpdate(false);
        break;
    }
  };

  return (
    <>
      <div className="question">
        <div className="question-heading">
          <div className="question-hide-button">
            {hide ? (
              <div
                onClick={() => toggleAnswer("show")}
                className="hide-button-outer-box"
              >
                <RemoveIcon className="hide-button" />
              </div>
            ) : (
              <div
                onClick={() => toggleAnswer("hide")}
                className="hide-button-outer-box"
              >
                <AddIcon className="hide-button" />
              </div>
            )}
          </div>
          <div className="question-text">{props.question.question}</div>
        </div>
        <div
          style={{ display: hide == true && update == false ? "block" : "none" }}
          className="question-answer"
        >
          <div
            style={{
              display:
                props.question.questionanswer.length > 0 ? "block" : "none",
            }}
          >
            <div className="answer-text">
              {props.question.questionanswer[0].answer}
            </div>
            <Divider className="edit-divider" />
            <div className="edit-box">
              <div onClick={() => toggelEdit("show")}>
              <EditIcon
                className="edit-icon"
              />
              </div>
            </div>
          </div>
          <div style={{ display: update == true ? "block" : "none" }}>
            <AnswerUpdate
              id={props.question.questionanswer[0].id}
              answer={props.question.questionanswer[0].answer}
            />
          </div>
          <div
            style={{
              display:
                props.question.questionanswer.length > 0 ? "none" : "block",
            }}
            id={props.question.id}
          >
            <AnswerCreate />
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
