import React, {useState, useContext, useEffect} from 'react';
import BlogContext from '../../context/blog/blogContext';

const BlogForm = () => {
    const blogContext = useContext(BlogContext);

    const {addPost, current, clearCurrent, updatePost} = blogContext;

    useEffect(() => {
        if(current !== null) {
            setPost(current);
        } else {
            setPost({
                message: ''
            });
        }
    }, [blogContext, current]);

    const [post, setPost] = useState({
        message: ''
    });

    const {  message } = post;

    const onChange = e => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
    };

    const onSubmit = e => {
        e.preventDefault();
        if(current === null){
            addPost(post);
        } else {
            updatePost(post);
        }
        clearAll();
    };

    const clearAll = () => {
        clearCurrent();
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className="text-primary hide-sm">{current ? 'Edit Message' : 'Post Message'}</h2>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <input type="text" name='message' placeholder="Enter your message" value={message} className="form-control" onChange={onChange}/>
            </div>
            <div className="form-group">
                <input type="submit" value={current ? 'UPDATE' : 'SEND'} className="btn btn-primary btn-block"/>
            </div>
            {current && 
            <div className="form-group">
                <button className="btn btn-light btn-block" onClick={clearAll}>CLEAR</button>
            </div>
            }
        </form>
    );
};


export default BlogForm;
