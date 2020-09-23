import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import bidReducer from './bidReducers';
import userReducer from './userReducers';
import toastReducer from './toastReducers';

const appReducer = combineReducers({
    taskReducer,
    bidReducer,
    userReducer,
    toastReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;