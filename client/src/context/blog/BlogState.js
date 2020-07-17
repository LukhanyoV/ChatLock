import React, {useReducer} from 'react';
import axios from 'axios';
import BlogContext from './blogContext';
import blogReducer from './blogReducer';
import {
    ADD_POST,
    DELETE_POST,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_POST,
    ADD_ERROR,
    GET_POST,
    CLEAR_POST,
    GET_ERROR
} from '../types';

const BlogState = props => {
    const initialState = {
        posts: null,
        current: null,
        error: null
    };

    const [state, dispatch] = useReducer(blogReducer, initialState);

    // Get Posts
    const getPost = async () => {

        try {
            const res = await axios.get('/blog');
            dispatch({
                type: GET_POST, 
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: GET_ERROR, 
                payload: err.response.msg
            });
        }
    }

    // Add post
    const addPost = async post => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/blog', post, config);
            dispatch({
                type: ADD_POST, 
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ADD_ERROR, 
                payload: err.response.msg
            });
        }
    }

    // Delete post 
    const deletePost = async id => {
        try {
            await axios.delete(`/blog/${id}`);
            dispatch({
                type: DELETE_POST, 
                payload: id
            });
        } catch (err) {
            dispatch({
                type: ADD_ERROR, 
                payload: err.response.msg
            });
        }
    }
    
    // Update the post 
    const updatePost = async post => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {
            const res = await axios.put(`/blog/${post._id}`, post, config);
            dispatch({
                type: UPDATE_POST, 
                payload: res.data
            });
        } catch (err) {
            dispatch({
                type: ADD_ERROR, 
                payload: err.response.msg
            });
        }
        
    }

    // Clear Post
    const clearPost = () => {
        dispatch({type: CLEAR_POST});
    }

    // Set current post 
    const setCurrent = post => {
        dispatch({type: SET_CURRENT, payload: post});
    }

    // Clear current post
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT});
    }


    return (
        <BlogContext.Provider
            value={{
                posts: state.posts,
                current: state.current,
                error: state.error,
                addPost,
                deletePost,
                setCurrent,
                clearCurrent,
                updatePost,
                getPost,
                clearPost
            }}
        >
            {props.children}
        </BlogContext.Provider>
    )

};

export default BlogState;