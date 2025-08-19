import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDrmzHXy61Emt7vJZ-c8CB0t4Yuv6CucS0',

  authDomain: 'loginmern-cfd37.firebaseapp.com',

  projectId: 'loginmern-cfd37',

  storageBucket: 'loginmern-cfd37.firebasestorage.app',

  messagingSenderId: '431593437064',

  appId: '1:431593437064:web:bdd0044723f447fa85ec3d',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const facebookProvider = new FacebookAuthProvider();

export { auth, facebookProvider };
