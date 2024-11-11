import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

export function Header() {
  return (
    <nav className="flex justify-between items-center pt-2 mb-8">
      <div className="logo">logo</div>
      <div className="links">
        <ul className="flex gap-5">
          <Link to={'/'}>Home</Link>
          <Link to={'/dashboard'}>Dashboard</Link>
          <li>Forex</li>
          <li>Stocks</li>
          <li>Crypto</li>
          <li>About</li>
        </ul>
      </div>
      <div className="flex gap-3 font-semibold">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger>currency</DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>USD</DropdownMenuItem>
              <DropdownMenuItem>EUR</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <button>Login</button>
        <button className="bg-blue-400 text-slate-600 rounded-sm px-5 py-3">
          Start For Free
        </button>
      </div>
    </nav>
  );
}
