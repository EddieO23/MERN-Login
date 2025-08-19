import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { motion } from 'framer-motion';

import styles from './signup.module.css';
import { emailRegex, passwordRegex } from '../../utils/RegEx';
import Loader from '../loader/Loader';

function SignUp() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
    email: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const [show, setShow] = useState(false);

  function handleInputChange(e) {
    const { name, value } = e.target;

    setUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSignUp = async () => {
    if (!userDetails.username) {
      toast.error('Please enter a valid username');
      return;
    }

    if (!emailRegex.test(userDetails.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(userDetails.password)) {
      toast.error(
        'Password must be at least 8 characters and must include at least one special character and one number'
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        'http://localhost:4000/user/register',
        userDetails
      );

      toast.success(response.data.msg);
      console.log(response);
      setIsLoading(false);
      navigate('/home');
    } catch (error) {
      toast.error(error.response.data.msg);
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      }}
      className={styles.container}
    >
      <div className={styles.formContainer}>
        <h2>Sign Up...</h2>
        <div className={styles.inputContainer}>
          <input
            value={userDetails.username}
            placeholder='Enter your username'
            type='text'
            name='username'
            onChange={handleInputChange}
          />
          <input
            value={userDetails.email}
            placeholder='Enter your email'
            type='email'
            name='email'
            onChange={handleInputChange}
          />

          <div className={styles.passwordContainer}>
            <input
              value={userDetails.password}
              placeholder='Enter your password'
              type={show ? 'text' : 'password'}
              name='password'
              onChange={handleInputChange}
            />
            <button
              onClick={() => {
                setShow(!show);
              }}
            >
              {show ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          <button disabled={isLoading} onClick={handleSignUp}>
            {isLoading ? <Loader /> : 'Sign Up'}
          </button>
        </div>

        <Link to={'/'}>Already have an account? Login</Link>
      </div>
    </motion.div>
  );
}

export default SignUp;
