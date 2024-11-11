import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Homepage } from './components/homepage';
import { Register } from './components/register';
import { Login } from './components/login';
import Dashboard from './pages/dashboard';

function App() {
  return (
    <>
      {/* <Header />
      <Landingpage />
      <Footer /> */}

      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
