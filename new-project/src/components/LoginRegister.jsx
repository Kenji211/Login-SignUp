import { useState } from 'react';
import './LoginRegister.css';
import LoginModule from './LoginModule';
import RegisterModule from './SignUpModule';

const LoginRegister = () => {

    const [action, setAction] = useState('login');

    return (
        <div className="login-register-bg">
            <div className={`wrapper ${action}`}>
                <LoginModule onSwitchToRegister={() => setAction('register')} />
                <RegisterModule onSwitchToLogin={() => setAction('login')} />
            </div>
        </div>
    )
}

export default LoginRegister