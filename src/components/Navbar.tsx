import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { supabase } from "@/lib/supabase";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserId(user?.id || null);
    };

    fetchUser();
  }, []);

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-talent-purple font-bold text-xl">
                TalentVerse
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-talent-purple transition-colors font-bold px-2"
            >
              Homepage
            </Link>
            <Link
              to="/explore"
              className="text-gray-700 hover:text-talent-purple transition-colors font-bold px-2"
            >
              Explore
            </Link>
            {userId ? (
              <Link
                to={`/profile/${userId}`}
                className="text-gray-700 hover:text-talent-purple transition-colors font-bold px-2"
              >
                Profile
              </Link>
            ) : (
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => navigate("/login")}>
                  Log In
                </Button>
                <Button
                  className="bg-talent-purple hover:bg-talent-purple-dark text-white"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-talent-purple hover:bg-gray-100 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white pb-3 pt-2 items-center justify-center flex ">
          <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/"
              className="block px-3 py-2 rounded-md text-center font-medium text-gray-700 hover:text-talent-purple hover:bg-gray-100"
            >
              Homepage
            </Link>
            <Link
              to="/explore"
              className="block px-3 py-2 rounded-md text-center font-medium text-gray-700 hover:text-talent-purple hover:bg-gray-100"
            >
              Explore
            </Link>
            {userId ? (
              <Link
                to={`/profile/${userId}`}
                className="block px-3 py-2 rounded-md text-center font-medium text-gray-700 hover:text-talent-purple hover:bg-gray-100"
              >
                Profile
              </Link>
            ) : (
              <div className="mt-4 flex flex-col space-y-2 px-3">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </Button>
                <Button
                  className="w-full justify-center bg-talent-purple hover:bg-talent-purple-dark text-white"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;