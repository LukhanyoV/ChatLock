import {
    ADD_POST,
    DELETE_POST,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_POST,
    ADD_ERROR,
    GET_POST,
    GET_ERROR,
    CLEAR_POST
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case GET_POST:
            return {
                ...state,
                posts: action.payload,
                loading: false
            }
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false
            }
        case UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post => post._id === action.payload._id ? action.payload : post),
                loading: false
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload),
                loading: false
            }
        case CLEAR_POST:
            return {
                ...state,
                posts: null,
                error: null,
                current: null
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case ADD_ERROR:
        case GET_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}