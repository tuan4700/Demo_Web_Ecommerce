import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [user, setUser] = useState({
        name: '', email: '', password: ''
    })

    function onChangeInput(e) {
        const {name, value} = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    async function registerSubmit(e) {
        e.preventDefault();
        try {
            await axios.post('/user/register', {...user})
            localStorage.setItem("firstLogin", true);
            window.location.href = "/";
        } catch (error) {
            alert(error.response.data.message);
        }
    }

    return (
        <div className="register-page">
            <h2 className="register-page__title">Register</h2>
            <form onSubmit={registerSubmit}>
                <div className="form-group register-page__form-group">
                    <label htmlFor="exampleInputEmail1">Name</label>
                    <input type="text" name="name" className="form-control" id="exampleInputEmail1" value={user.name} placeholder="Enter name" onChange={onChangeInput}/>
                </div>
                <div className="form-group register-page__form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" name="email" className="form-control" id="exampleInputEmail1" value={user.email} placeholder="Enter email" onChange={onChangeInput}/>
                </div>
                <div className="form-group register-page__form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={user.password} placeholder="Password" onChange={onChangeInput}/>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" value={user.password} placeholder="Confirm Password"/>
                </div> */}
                <div className="d-flex register-page__btns">
                    <button type="submit" className="btn btn-primary register-page__btns__main">
                        <p className="register-page__btns__main__title">Register</p>
                    </button>
                    <Link to="/login" className="register-page__btns__side">
                        <p className="register-page__btns__side__title">Login</p>
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register;