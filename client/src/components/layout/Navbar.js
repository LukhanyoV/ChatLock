import React, {Fragment, useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import BlogContext from '../../context/blog/blogContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);
    const blogContext = useContext(BlogContext);

    const {isAuthenticated, logout, user} = authContext;
    const {clearPost} = blogContext;

    const onLogout = () => {
        logout();
        clearPost();
    }

    const authLinks = (
        <Fragment>
            <li>
                Hello {user && user.name }
            </li>
            <li>
                <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
                <a onClick={onLogout} href="#!">
                    <i className="fa fa-sign-out-alt"/> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const guestLinks = (
        <Fragment>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
        </Fragment>
    )

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <Link className="navbar-brand" to="/">
            <i className="fa fa-lock"></i>{" "}
                    ChatLock
            </Link>
        
            <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                    {isAuthenticated ? authLinks : guestLinks}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;
