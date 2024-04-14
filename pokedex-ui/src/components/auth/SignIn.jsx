import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link, useNavigate } from 'react-router-dom';
import pokedexLogo from '../../assets/71nPNbm2e9L._AC_UF894,1000_QL80_.jpg';


import './SignIn.css'; 

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate('/');
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className='sign-in-page'>
      <div className='sign-in-container'>
        <div className='sign-in-branding'>
          <img src={pokedexLogo} alt='Pokedex' className='pokedex-logo' />
          <h2>Welcome to Pokedex</h2>
        </div>
        <form onSubmit={handleSignIn} className='sign-in-form'>
          <h1>Sign In</h1>
          {error && <p className='error'>{error}</p>}
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type='submit' className='sign-in-button'>Sign In</button>
          
          <div className='signup-link'>
            Don't have an account? <Link to='/signup' className='link'>Sign Up</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
