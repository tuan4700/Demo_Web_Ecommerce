import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [user, setUser] = useState({
        email: '', password: ''
    })

    function onChangeInput(e) {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    async function loginSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('/user/login', {...user})
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="login-page">
            <h2 className="login-page__title">Login</h2>
            <form onSubmit={loginSubmit}>
                <div className="form-group login-page__form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={user.email} placeholder="Enter email" onChange={onChangeInput}/>
                </div>
                <div className="form-group login-page__form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={user.password} placeholder="Password" onChange={onChangeInput}/>
                </div>
                <div className="d-flex login-page__btns">
                    <button type="submit" className="btn btn-primary login-page__btns__main">
                        <p className="login-page__btns__main__title">Login</p>
                    </button>
                    <Link to="/register" className="login-page__btns__side">
                        <p className="login-page__btns__side__title">Register</p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Login;