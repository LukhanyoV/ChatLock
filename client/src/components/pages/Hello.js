import React, {useContext, useEffect} from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';

export const Hello = () => {
    const authContext = useContext(AuthContext);

    useEffect(() => {
        authContext.loadUser();
        // eslint-disable-next-line
    }, []);
    
    const {isAuthenticated} = authContext;


    return (
        <div className="container">
            <h2>Main Page</h2>
            <div>
                WELCOME TO MY SITE ABOUT
                SOMETHING I DONT KNOW TOO
            </div>
            {isAuthenticated && 
                <Link to="/dashboard" className="btn btn-success">GO TO DASHBOARD</Link>
            }
            {!isAuthenticated && 
                <div>
                    <Link to="/login" className="btn btn-primary">LOGIN</Link>
                    <hr/>
                    <Link to="/register" className="btn btn-primary">REGISTER</Link>
                </div>
            }

        </div>
    )
}

export default Hello;