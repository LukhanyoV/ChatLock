import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BlogContext from '../../context/blog/blogContext';

const BlogItem = ({post}) => {
    const blogContext = useContext(BlogContext);

    const {deletePost, setCurrent, clearCurrent} = blogContext;

    const {_id, name, message} = post;

    const onDelete = () => {
        deletePost(_id);
        clearCurrent();
    }

    return (
        <div className="card bg-light" style={{transform: "rotate(180deg)"}}>
            <h5 className="text-primary medium text-left">
                {name}
            </h5>
            <p className="small">
                {message}
            </p>
            <div className="text-right">
                <button className="btn btn-dark btn-xs" onClick={() => setCurrent(post)}><i className="fas fa-edit"/></button>
                <button className="btn btn-success btn-xs" onClick={onDelete}><i className="fas fa-trash"/></button>
            </div>
        </div>
    )
}

BlogItem.propTypes = {
    post: PropTypes.object.isRequired
}

export default BlogItem;
