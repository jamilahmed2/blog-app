import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const SignupPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            if (password !== confirmPassword) {
                setError("Passowrd not matched")
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/articles');
        } catch (e) {
            setError(e.message)
        }
    }

    return (
        <>
            <h1>Sign Up</h1>
            {error && <p className='error'>{error}</p>}
            <input
                placeholder='Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder='Confirm your password'
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
            />
            <button onClick={signUp}>Sign Up</button>
            <Link to='/login'>Already have an account? Log In Here.</Link>
        </>
    )
}

export default SignupPage