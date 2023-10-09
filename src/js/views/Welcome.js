import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

export default function Welcome() {
    const [ showLogin, setShowLogin ] = useState(true);
    const user = useSelector(({auth}) => auth.user);

    const optionsText = showLogin ?
        ['Need an account?', 'Register'] :
        ['Have an account?', 'Login']

    if(user) {
        return <Redirect to="/home"/>
    }

    return(
        <div className="centered-view">
            <div className="centered-container">
                { showLogin ? <LoginForm/> : <RegisterForm/> }

                <small className="form-text text-muted mt-2">{optionsText[0]}
                    <span
                    onClick={() => setShowLogin(!showLogin)}
                    className="btn-link ml-2">{optionsText[1]}</span></small>
            </div>
        </div>
    );
}