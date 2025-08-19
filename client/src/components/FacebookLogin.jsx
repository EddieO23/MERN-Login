import React, { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, facebookProvider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { FacebookLoginButton } from 'react-social-login-buttons';

function FacebookLogin() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFacebookLogin = async () => {
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      // User is signed in
      const user = result.user;
      console.log("Logged in user:", user);
      
      // Optional: Navigate to a different page after login
      navigate('/dashboard');
    } catch (error) {
      // Handle Errors here
      setError(error.message);
      console.error("Facebook Login Error:", error);
    }
  };

  return (
    <div>
      <FacebookLoginButton onClick={handleFacebookLogin} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default FacebookLogin;
