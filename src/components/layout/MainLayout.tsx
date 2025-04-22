
import { ReactNode } from "react";
import Navigation from "./Navigation";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-chef-soft-gray">
      <Navigation />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="p-6 text-center bg-white shadow-sm">
        <p className="text-sm font-roboto text-gray-500">© 2025 ChefMateAI - Your Personal Recipe Assistant</p>
      </footer>
    </div>
  );
};

export default MainLayout;
