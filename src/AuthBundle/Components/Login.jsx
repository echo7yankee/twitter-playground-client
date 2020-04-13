import React, { useState } from 'react';

//assets 
import spinner from '../../assets/gifs/spinner.gif';

//style
import style from './auth.module.css';
import { FaTwitter } from 'react-icons/fa';

//react router dom
import { Link, Redirect } from 'react-router-dom';

//redux
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../Redux/actions/auth/auth';

export const Login = ({ history }) => {

  const initState = {
    email: '',
    password: '',
  }

  //local State
  const [credentials, setCredentials] = useState(initState);

  //destructuring off of credentials
  const { email, password } = credentials;

  //redux
  const dispatch = useDispatch();
  const errors = useSelector(state => state.auth.errorsLogin);
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

    dispatch(loginUser(credentials, history))
  }

  if (authenticated) { return <Redirect to='/dashboard' /> }

  return (
    <>
      <div className="container">
        <div className={style.authContainer}>
          <div>
            <h1>
              Log in to Twitter
        </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className={style.formTop}>
              <div>
                <input type="text" name='email' placeholder='Email' value={email} onChange={handleChange} />
              </div>
              <div>
                <input type="password" name='password' placeholder='Password' value={password} onChange={handleChange} />
              </div>
              <div>
                <div>
                  <button>
                    Log in
              </button>
                </div>
              </div>
              {errors.error && <div className="errors">
                <p className='error'>{errors.error}</p>
              </div>}
            </div>
            <div className={style.formBottom}>
              <div>
                <span>
                  New to Twitter?
              </span>
                <Link to='register'>
                  Sign up now >>
                </Link>
              </div>
            </div>
          </form>
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
