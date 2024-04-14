import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { auth } from '../../firebase';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const navigate = useNavigate();

  const signUp = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignUpSuccess(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className='sign-up-page'>
      <div className='sign-up-container'>
        {signUpSuccess ? (
          <div className='sign-up-success'>
            <h1>You're all set!</h1>
            <p>You can now log in with your new account.</p>
            <button onClick={() => navigate('/signin')} className='go-to-signin-button'>
              Log In
            </button>
          </div>
        ) : (
          <form onSubmit={signUp} className='sign-up-form'>
            <h1>Sign Up</h1>
            {error && <p className='error'>{error}</p>}
            <input
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className='auth-input'
            />
            <input
              type='password'
              placeholder='Create a password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className='auth-input'
            />
            <button type='submit' className='sign-up-button'>Sign Up</button>
            <p className='switch-to-signin'>
              Already have an account? <Link to='/signin'>Log In</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
