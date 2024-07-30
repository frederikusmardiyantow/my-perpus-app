import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex gap-5 bg-gray-800 text-white px-10 py-3 h-16 items-center">
      <Link to="/" className="font-bold uppercase text-lg">
        My Perpus Challenge
      </Link>
      <div className="flex gap-4">
        <NavLink to="/" className="hover:text-gray-300">
          Dashboard
        </NavLink>
        <NavLink to="/customer" className="hover:text-gray-300">
          Customer
        </NavLink>
        <NavLink to="/buku" className="hover:text-gray-300">
          Buku
        </NavLink>
        <NavLink to="/peminjaman" className="hover:text-gray-300">
          Peminjaman
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
