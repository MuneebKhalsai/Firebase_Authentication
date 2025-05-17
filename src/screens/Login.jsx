import { useRef, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase/firebaseconfig";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/home');
      }
    });
  }, []);

  const email = useRef();
  const password = useRef();
  const [error, setError] = useState('');

  const loginUser = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then(() => {
        navigate('/home');
      })
      .catch((error) => {
        setError(error.message);
      });

    email.current.value = '';
    password.current.value = '';
  };

  return (
    <div className="max-w-sm mx-auto  p-6 border rounded-lg shadow-md mt-60">
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={loginUser} className="space-y-4">
        <input
          type="email"
          placeholder="Enter Your Email"
          ref={email}
          className="w-full px-2 h-12 border rounded "
          required
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          ref={password}
          className="w-full px-2 h-12 border rounded "
          required
        />
        <button type="submit" className="w-40 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Login </button> 
        <Link to={'Register'}><button type="submit" className="w-40 ml-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition">Sign In</button></Link>
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
