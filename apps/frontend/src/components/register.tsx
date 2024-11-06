import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function Register() {
  const [values, setValues] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/auth/register, values')
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-center items-center bg-primary h-screen">
      <div className="bg-white p-3 rounded w-25">
        <h1 className="font-semi-bold">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              name="name"
              onChange={(e) =>
                setValues({ ...values, userName: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
            />
          </div>
          <button type="submit" className="">
            Sign Up
          </button>
          <p>
            By signing up you agree to our <a href="#">Terms and Conditions</a>
          </p>
          <p>
            Already have an account?{' '}
            <Link to="/login" className="font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
