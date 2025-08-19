import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import styles from './ForgotPassword.module.css';
import { emailRegex, passwordRegex } from '../../utils/RegEx';
import Loader from '../loader/Loader';

function ForgotPassword() {
  const [step, setStep] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      }}
      className={styles.container}
    >
      <div className={styles.formContainer}>
        <h2>Forgot Password...</h2>
        {step === 0 && <EmailComponent setStep={setStep} />}
        {step === 1 && <OTPComponent setStep={setStep} />}
        {step === 2 && <PasswordComponent />}
      </div>
    </motion.div>
  );
}

export default ForgotPassword;

const EmailComponent = ({ setStep }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const getOTP = async () => {
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/resetPassword`,
        { email }
      );
      toast.success(response.data.msg);

      localStorage.setItem('email', email);

      setStep(1);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={email}
        placeholder='Enter your email...'
        type='email'
        name='email'
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={getOTP}>{isLoading ? <Loader /> : 'Get OTP'}</button>
      <Link to='/'>Wanna Login?</Link>
    </div>
  );
};

const OTPComponent = ({ setStep }) => {
  const [OTP, setOTP] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyOTP = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/verifyPasswordOTP`,
        { OTP }
      );
      toast.success(response.data.msg);

      setStep(2);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.inputContainer}>
      <input
        value={OTP}
        placeholder='Enter your OTP...'
        type='text'
        onChange={(e) => setOTP(e.target.value)}
      />
      <button onClick={verifyOTP}>
        {isLoading ? <Loader /> : 'Verify OTP'}
      </button>
    </div>
  );
};

const PasswordComponent = ({ email }) => {
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetPassword = async () => {
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters and must include at least one special character and one number'
      );
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/resetPassword`,
        { password, isOTPVerified: true, email: localStorage.getItem('email') }
      );
      toast.success(response.data.msg);
      navigate('/');
      localStorage.removeItem('email');
      setIsLoading(false);
    } catch (error) {
      toast.error(error.response.data.msg);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.PasswordComponent}>
      <div className={styles.passwordContainer}>
        <input
          value={password}
          placeholder='Enter new password...'
          type={show ? 'text' : 'password'}
          name='password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={() => {
            setShow(!show);
          }}
        >
          {show ? 'HIDE' : 'SHOW'}
        </button>
      </div>
      <div className={styles.inputContainer}>
        <button onClick={resetPassword}>
          {isLoading ? <Loader /> : 'Reset Password'}
        </button>
      </div>
    </div>
  );
};
