import{
    PAGINATION_LOADING,
    PAGINATION_PAGE_NO,
} from '../actions/paginationActionType';

const initialState = {
    loading: false,
    page: 1,
}


export default function paginationReducer(
    state = initialState,
    {type, payload, error}
){
    switch(type){
        case PAGINATION_LOADING:
            return {...state, loading: payload}
        case PAGINATION_PAGE_NO:
            return {...state, page: payload}
        default:
            return state;
    }
}