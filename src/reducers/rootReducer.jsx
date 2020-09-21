import { combineReducers } from 'redux';
import taskReducer from './taskReducer';
import bidReducer from './bidReducers';

const appReducer = combineReducers({
    taskReducer,
    bidReducer,
});

const rootReducer = (state, action) => {
    return appReducer(state, action);
}

export default rootReducer;