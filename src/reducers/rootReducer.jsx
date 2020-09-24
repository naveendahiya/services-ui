import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import bidReducer from './bidReducers';
import userReducer from './userReducers';
import toastReducer from './toastReducers';
import paginationReducer from './paginationReducer';

const appReducer = combineReducers({
    taskReducer,
    bidReducer,
    userReducer,
    toastReducer,
    paginationReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;