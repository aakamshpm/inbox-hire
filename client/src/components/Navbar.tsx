import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FiHome,
  FiUser,
  FiLogIn,
  FiLogOut,
  FiMenu,
  FiX,
  FiBook,
} from "react-icons/fi";
import { useState } from "react";
import api from "../utils/api";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/user/logout");
      logout();
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-gray-100 border-b border-gray-700">
      <div className="container mx-auto px-4 py-3">
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <FiHome className="text-blue-400" />
            Inbox Hire
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/docs"
              className="hover:text-blue-400 transition-colors flex items-center gap-1"
            >
              <FiBook className="text-sm" />
              Docs
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <FiHome className="text-sm" />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="hover:text-blue-400 transition-colors flex items-center gap-1"
                >
                  <FiUser className="text-sm" />
                  Profile
                </Link>
                <button
                  onClick={() => handleLogout()}
                  className="bg-gray-700 cursor-pointer hover:bg-blue-500 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
                >
                  <FiLogOut className="text-sm" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors flex items-center gap-1"
              >
                <FiLogIn className="text-sm" />
                Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden flex items-center justify-between">
          <Link
            to="/"
            className="text-xl font-semibold text-white hover:text-blue-400 transition-colors flex items-center gap-2"
          >
            <FiHome className="text-blue-400" />
            Inbox Hire
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <Link
              to="/docs"
              className="block hover:text-blue-400 transition-colors py-2 flex items-center gap-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FiBook />
              Docs
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/"
                  className="block hover:text-blue-400 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiHome />
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="block hover:text-blue-400 transition-colors py-2 flex items-center gap-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <FiUser />
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full cursor-pointer bg-gray-700 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <FiLogOut />
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-md transition-colors text-center flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                <FiLogIn />
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
