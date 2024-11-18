import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './functions/currencycontext';
import { ThemeProvider } from './functions/themeContext';

import { Homepage } from './components/homepage';
import { Register } from './components/register';
import { Login } from './components/login';
import { CryptoDashboard } from './pages/crypto.dashboard';
import { CryptoCoin } from './pages/crypto.coin';
import About from './components/about';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CurrencyProvider>
          <Routes>
            <Route path="/" element={<Homepage />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/crypto" element={<CryptoDashboard />} />
            <Route path="/crypto/:id" element={<CryptoCoin />} />
            <Route path='/about' element={<About />} />
          </Routes>
        </CurrencyProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
