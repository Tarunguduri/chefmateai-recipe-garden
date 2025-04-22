
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Recipes", path: "/recipes" },
    { name: "Meal Planner", path: "/meal-planner" },
    { name: "Shopping List", path: "/shopping-list" },
    { name: "Profile", path: "/profile" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-montserrat font-bold bg-gradient-to-r from-chef-bright-orange to-chef-soft-orange bg-clip-text text-transparent">
                ChefMateAI
              </span>
            </NavLink>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  cn(
                    "px-3 py-2 rounded-md text-sm font-montserrat font-medium transition-all duration-200",
                    isActive 
                      ? "bg-chef-soft-orange text-chef-bright-orange" 
                      : "text-gray-600 hover:bg-chef-soft-peach hover:text-chef-bright-orange"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Button
              variant="default"
              className="ml-4 font-montserrat bg-chef-bright-orange text-white hover:bg-opacity-90 transition-all duration-200 hover:scale-105"
            >
              Sign In
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black hover:bg-chef-soft-peach focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg 
                  className="block h-6 w-6" 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden bg-white`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "block px-3 py-2 rounded-md text-base font-montserrat font-medium transition-all duration-200",
                  isActive
                    ? "bg-chef-soft-orange text-chef-bright-orange"
                    : "text-gray-600 hover:bg-chef-soft-peach hover:text-chef-bright-orange"
                )
              }
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <Button
            variant="default"
            className="w-full mt-3 py-2 font-montserrat bg-chef-bright-orange text-white hover:bg-opacity-90"
            onClick={() => setIsMenuOpen(false)}
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
