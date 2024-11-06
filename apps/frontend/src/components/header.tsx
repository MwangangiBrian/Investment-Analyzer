export function Header() {
  return (
    <>
      <nav className="flex justify-between items-center pt-2 mb-8">
        <div className="logo">logo</div>
        <div className="links">
          <ul className="flex gap-5">
            <li>Home</li>
            <li>Forex</li>
            <li>Stocks</li>
            <li>Crypto</li>
            <li>About</li>
          </ul>
        </div>
        <div className="flex gap-3 font-semibold">
          <button>Login</button>
          <button className="bg-blue-400 text-slate-600 rounded-sm px-5 py-3">
            Start For Free
          </button>
        </div>
      </nav>
    </>
  );
}
