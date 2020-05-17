import { SET_SEARCH_LIST,ADD_SEARCH, SET_TOP_TEN } from '../actions/types';

const initialState = {
    searches: [],
    topTen:[]
}

export default function(state = initialState, action ) {
    switch(action.type) {
        case SET_SEARCH_LIST:
        console.log(action.payload)
            return {
                ...state,
                searches: action.payload,
            }
        case SET_TOP_TEN:
            return {
                ...state,
                topTen: action.payload,
            }
        default: 
            return state;
    }
}