
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import HomePage from "./pages/HomePage";
import RecipesPage from "./pages/RecipesPage";
import ProfilePage from "./pages/ProfilePage";
import MealPlannerPage from "./pages/MealPlannerPage";
import ShoppingListPage from "./pages/ShoppingListPage";
import SnapCookPage from "./pages/SnapCookPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./hooks/use-auth";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
            <Route path="/recipes" element={
              <ProtectedRoute>
                <MainLayout><RecipesPage /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout><ProfilePage /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/meal-planner" element={
              <ProtectedRoute>
                <MainLayout><MealPlannerPage /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/shopping-list" element={
              <ProtectedRoute>
                <MainLayout><ShoppingListPage /></MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/snap-cook" element={
              <ProtectedRoute>
                <MainLayout><SnapCookPage /></MainLayout>
              </ProtectedRoute>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
