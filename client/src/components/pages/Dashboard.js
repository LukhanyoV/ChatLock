import React, { useContext, useEffect } from 'react';
import Blog from '../blogs/Blog';
import BlogForm from '../blogs/BlogForm';
import AuthContext from '../../context/auth/authContext';

const Dashboard = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        <div className="container">
            <h2>Dashboard</h2>
            <div className="grid-2">
                <div style={messageBox}>
                    <Blog />
                </div>
                <div>
                    <BlogForm />
                </div>
            </div>
        </div>
    )
}

const messageBox = {
    padding: "5px", 
    height: "400px", 
    overflowY: "scroll", 
    border: "2px solid black",
    transform: "rotate(180deg)",
    direction: "rtl",
    textAlign: "left"
}

export default Dashboard;
