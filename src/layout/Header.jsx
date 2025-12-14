import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-6 py-4 flex gap-4">
        <Link to="/" className="font-medium hover:underline">
          Home
        </Link>
        <Link to="/about" className="font-medium hover:underline">
          About
        </Link>
      </nav>
    </header>
  );
}
