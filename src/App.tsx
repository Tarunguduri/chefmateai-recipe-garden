
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import ProfilePage from "./pages/ProfilePage";
import MealPlannerPage from "./pages/MealPlannerPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import SnapCookPage from "./pages/SnapCookPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
          <Route path="/recipes" element={<MainLayout><RecipesPage /></MainLayout>} />
          <Route path="/profile" element={<MainLayout><ProfilePage /></MainLayout>} />
          <Route path="/meal-planner" element={<MainLayout><MealPlannerPage /></MainLayout>} />
          <Route path="/shopping-list" element={<MainLayout><ShoppingListPage /></MainLayout>} />
          <Route path="/snap-cook" element={<MainLayout><SnapCookPage /></MainLayout>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
