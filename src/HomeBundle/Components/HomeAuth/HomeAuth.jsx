import React, { useState } from 'react';

//assets 
import spinner from '../../../assets/gifs/spinner.gif';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../Redux/actions/auth/auth';

//style
import style from './homeAuth.module.css';
import { FaTwitter } from 'react-icons/fa';

export const HomeAuth = ({ history }) => {

  const initState = {
    email: '',
    password: ''
  }

  const [credentials, setCredentials] = useState(initState);

  //destructuring
  const { email, password } = credentials;

  //redux
  const dispatch = useDispatch();
  const errors = useSelector(state => state.auth.errorsLogin);
  const isLoading = useSelector(state => state.auth.isLoading);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(loginUser(credentials, history))
  }

  return (
    <>
      <div className={style.homeAuthContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name='email'
            placeholder='Phone, email, or username'
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            name='password'
            placeholder='Password'
            value={password}
            onChange={handleChange}
          />
          <button type='submit'>Log in</button>
        </form>

        {errors.error && <div className='error-container'>
          <p className='error'>{errors.error}</p>
        </div>}
      </div>
      {isLoading && <div className="overlay overlay-white">
        <FaTwitter className='mb-1' />
        <div>
          <img src={spinner} alt='spinner' />
        </div>
      </div>}
    </>
  )
}
