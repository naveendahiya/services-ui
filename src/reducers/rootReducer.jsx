import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import bidReducer from './bidReducers';
import userReducer from './userReducers';
import toastReducer from './toastReducers';
import paginationReducer from './paginationReducer';
import locationReducer from './locationReducer';

const appReducer = combineReducers({
    taskReducer,
    bidReducer,
    userReducer,
    toastReducer,
    paginationReducer,
    locationReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;