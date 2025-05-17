import { useRef } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../config/firebase/firebaseconfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const email = useRef();
  const password = useRef();

  const navigate = useNavigate();
  const auth = getAuth(app);

  const registerUser = (event) => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        console.log(userCredential.user);
        navigate('');
      })
      .catch((error) => {
        console.log(error.message);
      });

    email.current.value = '';
    password.current.value = '';
  };

  return (
    <div className=" w-100 ml-170 mt-60 p-6 border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
      <form onSubmit={registerUser} className="space-y-4">
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
          className="w-full h-12 px-2 border rounded"
          required
        />
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
