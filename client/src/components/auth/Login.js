import React, {useState, useContext, useEffect} from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Login = (props) => {
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const {setAlert} = alertContext;
    const {login, error, clearErrors, isAuthenticated} = authContext;

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'Invalid Credentials'){
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const {email, password} = user;

    const onChange = e => setUser({...user, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        if(email === '' || password === ''){
            setAlert('Please fill in all fields', 'danger');
        } else {
            login({
                email,
                password
            });
        }
    }

    return (
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={onSubmit} autoComplete="off">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" value={email} onChange={onChange} className="form-control" required/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" value={password} onChange={onChange} className="form-control" required/>
                </div>
                <div className="form-group">
                    <button type="submit" name="login" id="login" className="btn btn-dark btn-block">LOGIN</button>
                </div>
            </form>
        </div>
    )
}

export default Login;
