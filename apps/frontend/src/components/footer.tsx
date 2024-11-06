export function Footer() {
  return (
    <>
      <div className="flex gap-3 justify-between">
        <div className="flex gap-3 flex-col">
          <h1>Investment Analyzer</h1>
          <div className="socials">
            <ul>
              <li>X</li>
              <li>Instagram</li>
              <li>Github</li>
            </ul>
          </div>
        </div>
        <div className="flex gap-3 flex-col">
          <h2 className="font-semi-bold">Quick Links</h2>
          <ul>
            <li>Home</li>
            <li>Login</li>
            <li>Register</li>
          </ul>
        </div>
        <div className="flex gap-3 flex-col">
          <h2 className="font-semi-bold">Company</h2>
          <ul>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Terms of Service</li>
          </ul>
        </div>
      </div>
      <span>@ 2024, Investment Analyzer</span>
    </>
  );
}
