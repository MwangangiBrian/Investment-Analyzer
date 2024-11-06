import React from 'react';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/auth/login, values')
      .then((res) => {
        if(res.data.Status==='Success'){
            Navigate('/')
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-center items-center bg-primary h-screen">
      <div className="bg-white p-3 rounded w-25">
        <h1 className="font-semi-bold">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="Enter Email" name="email"
            onChange={e => setValues({...values, email: e.target.value})} />
          </div>
          <div>
            <label htmlFor="password">Username</label>
            <input
              type="password"
              placeholder="Enter Password"
              name="password"
              onChange={e => setValues({...values, password: e.target.value})}
            />
          </div>
          <button type="submit" className="">
            Sign In
          </button>

          <p>
            Create Account
            <Link to="/register" className="font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
