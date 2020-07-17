import React, {Fragment, useContext, useEffect} from 'react';
import BlogItem from './BlogItem';
import BlogContext from '../../context/blog/blogContext';

const Blog = () => {
    const blogContext = useContext(BlogContext);

    const { posts, getPost, loading } = blogContext;

    useEffect(() => {
        getPost();
        // eslint-disable-next-line
    }, []);

    if(posts !== null && posts.length === 0 && !loading){
        return <h4>No messages yet</h4>;
    }

    return (
        <Fragment>
            {posts !== null && !loading ? (
            posts.map(post => (
                <BlogItem key={post._id} post={post}/>
            ))
            ) : <h5 className="text-info" style={{transform: "rotate(180deg)", position: "top"}}>Loading Messages....</h5>}
        </Fragment>
    );
};

export default Blog;
