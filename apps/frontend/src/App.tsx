import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Landingpage } from './components/landingpage';
import { Register } from './components/register';
import { Login } from './components/login';


function App() {
  return (
    <>
      {/* <Header />
      <Landingpage />
      <Footer /> */}

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
