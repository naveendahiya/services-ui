import{
    GET_TASK_QUESTIONS,
    GET_TASK_QUESTIONS_PENDING,
    GET_QUESTIONS_ERROR,
    CREATE_QUESTION, 
    UPDATE_QUESTION,
    CREATE_QUESTION_PENDING,
    CREATE_ANSWER, 
    UPDATE_ANSWER,
    CREATE_ANSWER_PENDING,
    UPDATE_QUESTION_PENDING,
    UPDATE_ANSWER_PENDING,
} from '../actions/questionActionType';

const initialState = {
    questions: [],
    updateQuestionPending: false,
    updateAnswerPending: false,
    getQuestionsPending: false,
    createQuestionPending: false,
    createAnswerPending: false,
    error: null,
}

export default function questionReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case GET_TASK_QUESTIONS:
            return {...state, questions: payload};
        case GET_TASK_QUESTIONS_PENDING:
            return {...state, getQuestionsPending: payload};
        case GET_QUESTIONS_ERROR:
            return {...state, error: payload}
        case CREATE_QUESTION:
            return {...state, questions: [...payload, ...state.questions]}
        case UPDATE_QUESTION:
            return { 
                ...state, 
                questions: state.questions.map(
                    (question, i) => i === payload[0] ? {...question, question: payload[1]}
                                            : question
                )
             };
        case UPDATE_QUESTION_PENDING:
            return {...state, updateQuestionPending: payload};
        case CREATE_QUESTION_PENDING:
            return {...state, createQuestionPending: payload}
        case CREATE_ANSWER:
            return { 
                ...state, 
                questions: state.questions.map(
                    (question, i) => i === payload[0] ? {...question, questionanswers: [...question.questionanswer, ...payload[1]]}
                                            : question
                )
             };
        case UPDATE_ANSWER:
            return { 
                ...state, 
                questions: state.questions.map(
                    (question, i) => i === payload[0] ? {...question, questionanswer: state.question.questionanswer.map((answerObj, i) => i === 0 ? {...answerObj, answer: payload[1]}: {answerObj})}
                                            : question
                )
             };
        case UPDATE_ANSWER_PENDING:
            return {...state, updateAnswerPending: payload}
        case CREATE_ANSWER_PENDING:
            return {...state, createAnswerPending: payload}
        default:
            return state;
    }
}