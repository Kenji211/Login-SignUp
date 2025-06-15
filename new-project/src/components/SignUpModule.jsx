import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterModule = ({ onSwitchToLogin }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleRegistrationSubmit = (e) => {
        e.preventDefault()
        if (confirmPassword !== password) {
            console.log("Passwords do not match");
            return;
        }

        axios.post('http://localhost:3001/register', { username, email, password })
            .then(result => {
                alert("Registration successful!");
                onSwitchToLogin();
                console.log(result)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="form-box register" >
            <form onSubmit={handleRegistrationSubmit}>
                <h1>Register</h1>
                <>
                    <div className="input-box">
                        <input type="text"
                            name='username'
                            placeholder='Username' required
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />
                        <FaUser className='icon' />
                    </div>

                    <div className="input-box">
                        <input type="text"
                            name='email'
                            placeholder='Email' required
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                        />
                        <FaEnvelope className='icon' />
                    </div>

                    <div className="input-box">
                        <input type="password"
                            name='password'
                            placeholder='Password' required
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                        <FaLock className='icon' />
                    </div>
                    <div className="input-box">
                        <input type="password"
                            name='confirm-password'
                            placeholder='Confirm password' required
                            onChange={(e) => {
                                setConfirmPassword(e.target.value)
                            }}
                        />
                        <FaLock className='icon' />
                    </div>
                </>
                {confirmPassword && confirmPassword !== password && (
                    <p className='confirmPasswordError'
                        style={{ color: 'red', fontSize: '0.9rem' }}>
                        Password does not match.
                    </p>
                )}

                <button type="submit">Sign up</button>

                <div className="register-link">
                    <p>Already have an account?
                        <a onClick={onSwitchToLogin}> Login</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterModule