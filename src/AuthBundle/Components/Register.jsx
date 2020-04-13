import React, { useState } from 'react';

//assets 
import spinner from '../../assets/gifs/spinner.gif';

//style
import style from './auth.module.css';
import { FaTwitter } from 'react-icons/fa';

//react router dom
import { Redirect } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Redux/actions/auth/auth';

export const Register = ({ history }) => {

  const initState = {
    fName: '',
    lName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  //local State
  const [credentials, setCredentials] = useState(initState);

  //destructuring off of credentials
  const { fName, lName, email, password, confirmPassword } = credentials;

  //redux
  const dispatch = useDispatch();
  const errors = useSelector(state => state.auth.errorsRegister);
  const authenticated = useSelector(state => state.auth.authenticated);
  const isLoading = useSelector(state => state.auth.isLoading);

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(registerUser(credentials, history))
  }

  if (authenticated) { return <Redirect to='/dashboard' /> }

  return (
    <>
      <div className='overlay overlay-alpha-black '>
        <div className="container">
          <div className={style.authRegister}>
            <form onSubmit={handleSubmit}>
              <div className={style.authRegisterHeader}>
                <div></div>
                <FaTwitter />
                <button type='submit'>Register</button>
              </div>
              <div className={style.authRegisterInputContainer}>
                <div>
                  <h1>Create your account</h1>
                </div>
                <div>
                  <input type="text" name='fName' placeholder='First Name' value={fName} onChange={handleChange} />
                </div>
                <div>
                  <input type="text" name='lName' placeholder='Last Name' value={lName} onChange={handleChange} />
                </div>
                <div>
                  <input type="text" name='email' placeholder='Email' value={email} onChange={handleChange} />
                </div>
                <div>
                  <input type="password" name='password' placeholder='Password' value={password} onChange={handleChange} />
                </div>
                <div>
                  <input type="password" name='confirmPassword' placeholder='Confirm Password' value={confirmPassword} onChange={handleChange} />
                </div>
              </div>
              {errors.error && <div className="error-container">
                <p className='error'>{errors.error}</p>
              </div>}
            </form>
          </div>
        </div>
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
