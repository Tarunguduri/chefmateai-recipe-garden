
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Utensils, 
  User, 
  CalendarDays, 
  ShoppingBag,
  Camera,
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UserMenu from "@/components/auth/UserMenu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const closeMenu = () => setIsOpen(false);

  // Navigation items with icons
  const navItems = [
    { path: "/", label: "Home", icon: <Home size={20} /> },
    { path: "/recipes", label: "Recipes", icon: <Utensils size={20} /> },
    { path: "/profile", label: "Profile", icon: <User size={20} /> },
    { path: "/meal-planner", label: "Meal Planner", icon: <CalendarDays size={20} /> },
    { path: "/shopping-list", label: "Shopping List", icon: <ShoppingBag size={20} /> },
    { path: "/snap-cook", label: "Snap & Cook", icon: <Camera size={20} /> },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-chef-bright-orange">
                ChefMateAI
              </span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {navItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  variant={isActive(item.path) ? "default" : "ghost"}
                  className={`flex items-center gap-2 ${
                    isActive(item.path) 
                      ? "bg-chef-bright-orange hover:bg-chef-bright-orange text-white" 
                      : "text-gray-600 hover:text-chef-bright-orange hover:bg-chef-soft-peach"
                  }`}
                  onClick={closeMenu}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Button>
              </Link>
            ))}
          </div>
          
          {/* User menu - shown on all screen sizes */}
          <div className="flex items-center">
            <UserMenu />
            
            {/* Mobile menu button */}
            <div className="ml-2 md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-expanded={isOpen}
                className="relative"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && isMobile && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(item.path)
                    ? "bg-chef-bright-orange text-white"
                    : "text-gray-600 hover:bg-chef-soft-peach hover:text-chef-bright-orange"
                }`}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
