import { Link } from "react-router-dom";

function Logo() {
  return (
    <Link to="/" className="logo-link">
      <img
        src="images/logo.png"
        alt="TradeMind AI"
        className="logo"
      />
    </Link>
  );
}

export default Logo;