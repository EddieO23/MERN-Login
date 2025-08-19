import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

import styles from './home.module.css';
import { emailRegex, passwordRegex } from '../../utils/RegEx';
import Loader from '../loader/Loader';

function Home() {
  const navigate = useNavigate();
  const [show, setShow] = useState(true);
  const [user, setUser] = useState(null);
  const [newUserDetails, setNewUserDetails] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [isEdit, setIsEdit] = useState({
    username: false,
    email: false,
    password: false,
  });

  const getUser = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      setUser(response.data.user);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setNewUserDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const updateUserDetails = async (type) => {
    // Toast notifications for appropriate email/username/password
    if (!emailRegex.test(newUserDetails.email) && type === 'email') {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!passwordRegex.test(newUserDetails.password) && type === 'password') {
      toast.error(
        'Password must be at least 8 characters and must include at least one special character and one number'
      );
      return;
    }

    if (!newUserDetails.username && type === 'username') {
      toast.error('Please enter a valid username');
      return;
    }

    // Actually sending API req

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_SERVER_URL}/user/updateUser`,
        { type, newUserDetails },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );

      toast.success(response.data.msg);

      setIsEdit({ email: false, password: false, username: false });

      setNewUserDetails({ username: '', password: '', email: '' });

      getUser();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      {user && (
        <nav>
          <span>Hello, {user.username}</span>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
              toast.success('Bye bye.👋🏽');
            }}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </nav>
      )}

      {user && (
        <div className={styles.mainContainer}>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 1,
            }}
            className={styles.userDetails}
          >
            <strong>User Details</strong>
            <p>Username : {user.username}</p>
            <p>Email : {user.email}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 20,
              duration: 1,
            }}
            className={styles.editContainer}
          >
            <strong>Update User</strong>
            <div>
              <input
                name='username'
                value={newUserDetails.username}
                onChange={handleChange}
                disabled={!isEdit.username}
                placeholder='Update Username'
                type='text'
              />
              <button
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, username: true }));
                }}
                className={styles.edit}
              >
                Edit
              </button>
              {/* Username Input */}
              {isEdit.username && (
                <div className={styles.buttons}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <button onClick={() => updateUserDetails('username')}>
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit((prev) => ({
                            ...prev,
                            username: false,
                          }));
                          setNewUserDetails((prev) => ({
                            ...prev,
                            username: '',
                          }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div>
              <input
                name='email'
                value={newUserDetails.email}
                onChange={handleChange}
                disabled={!isEdit.email}
                placeholder='Update Email'
                type='text'
              />
              <button
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, email: true }));
                }}
                className={styles.edit}
              >
                Edit
              </button>
              {/* Email */}
              {isEdit.email && (
                <div className={styles.buttons}>
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <button onClick={() => updateUserDetails('email')}>
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setIsEdit((prev) => ({
                            ...prev,
                            email: false,
                          }));
                          setNewUserDetails((prev) => ({
                            ...prev,
                            email: '',
                          }));
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
            <div className={styles.passwordEdit}>
              <div className={styles.passwordContainer}>
                {/* Password input */}

                <input
                  name='password'
                  value={newUserDetails.password}
                  onChange={handleChange}
                  disabled={!isEdit.password}
                  placeholder='Update Password'
                  type={show ? 'text' : 'password'}
                />
                <button
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  {show ? 'HIDE' : 'SHOW'}
                </button>
              </div>
              <button
                onClick={() => {
                  setIsEdit((prev) => ({ ...prev, password: true }));
                }}
                className={styles.edit}
              >
                Edit
              </button>
            </div>
            {isEdit.password && (
              <div className={styles.buttons}>
                {isLoading ? (
                  <Loader />
                ) : (
                  <>
                    <button onClick={() => updateUserDetails('password')}>
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEdit((prev) => ({
                          ...prev,
                          password: false,
                        }));
                        setNewUserDetails((prev) => ({
                          ...prev,
                          password: '',
                        }));
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Home;
