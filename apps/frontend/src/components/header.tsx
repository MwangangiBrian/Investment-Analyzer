import { Link } from "react-router-dom";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useCurrency } from "../functions/currencycontext";
import { useTheme } from "../functions/themeContext";
import { FaSun, FaMoon } from 'react-icons/fa';
import { Login } from "./login";
import { Register } from "./register";

export function Header() {
  const { currency, setCurrency } = useCurrency();
  const { theme, toggleTheme } = useTheme();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const currencies = [
    { code: "USD", symbol: "$" },
    { code: "EUR", symbol: "€" },
    { code: "GBP", symbol: "£" },
    { code: "JPY", symbol: "¥" },
    { code: "AUD", symbol: "A$" },
  ];

  const currentCurrency = currencies.find((curr) => curr.code === currency);

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between items-center py-4 px-8 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-200">
        <div className="logo font-bold text-xl dark:text-white">InvestAnalyzer</div>
        <div className="links">
          <ul className="flex space-x-6">
            <li>
              <Link
                to={"/"}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>

            <li className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer transition-colors">
              Forex
            </li>
            <li className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white cursor-pointer transition-colors">
              Stocks
            </li>
            <li>
              <Link
                to={"/crypto"}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                Crypto
              </Link>
            </li>
            <li>
              <Link
                to={"/about"}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex gap-4 items-center">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <FaSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <FaMoon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                <span>
                  {currentCurrency?.symbol} {currency}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currencies.map((curr) => (
                  <DropdownMenuItem
                    key={curr.code}
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => setCurrency(curr.code as any)}
                  >
                    {curr.symbol} {curr.code}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <button
            onClick={() => setIsLoginOpen(true)}
            className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Sign In
          </button>
          <button
            onClick={() => setIsRegisterOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
          >
            Get Started
          </button>
        </div>
      </nav>
      
      <Login 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
      <Register 
        isOpen={isRegisterOpen} 
        onClose={() => setIsRegisterOpen(false)}
        onLoginClick={() => {
          setIsRegisterOpen(false);
          setIsLoginOpen(true);
        }}
      />
    </>
  );
}
