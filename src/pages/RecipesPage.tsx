
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RecipeCard from "@/components/recipe/RecipeCard";
import FilterButton from "@/components/ui/filter-button";

// Mock Recipe Data
const mockRecipes = [
  {
    id: 1,
    name: "Veggie Pasta Primavera",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "A delicious pasta dish loaded with fresh spring vegetables.",
    tags: ["vegetarian", "pasta", "quick"],
    time: "25 mins",
    calories: 450,
    isFavorite: false
  },
  {
    id: 2,
    name: "Spicy Chicken Stir-Fry",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "A quick and flavorful stir-fry with chicken and vegetables.",
    tags: ["high-protein", "poultry", "spicy"],
    time: "20 mins",
    calories: 380,
    isFavorite: true
  },
  {
    id: 3,
    name: "Mediterranean Quinoa Bowl",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    description: "A healthy and refreshing quinoa bowl with mediterranean flavors.",
    tags: ["vegan", "grain", "healthy"],
    time: "30 mins",
    calories: 320,
    isFavorite: false
  },
  {
    id: 4,
    name: "Creamy Mushroom Risotto",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    description: "A rich and creamy Italian risotto featuring savory mushrooms.",
    tags: ["vegetarian", "grain", "gourmet"],
    time: "40 mins",
    calories: 520,
    isFavorite: false
  }
];

// Filter categories
const filterOptions = [
  { id: "all", label: "All Recipes" },
  { id: "vegetarian", label: "Vegetarian", color: "bg-green-500" },
  { id: "vegan", label: "Vegan", color: "bg-emerald-500" },
  { id: "high-protein", label: "High Protein", color: "bg-red-500" },
  { id: "quick", label: "Quick & Easy", color: "bg-blue-500" },
  { id: "spicy", label: "Spicy", color: "bg-orange-500" },
];

const RecipesPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [recipes, setRecipes] = useState(mockRecipes);

  const handleFilterChange = (filterId: string) => {
    setActiveFilter(filterId);
  };

  const toggleFavorite = (recipeId: number) => {
    setRecipes(recipes.map(recipe => 
      recipe.id === recipeId 
        ? { ...recipe, isFavorite: !recipe.isFavorite } 
        : recipe
    ));
  };

  // Filter recipes based on active filter
  const filteredRecipes = activeFilter === "all" 
    ? recipes 
    : recipes.filter(recipe => recipe.tags.includes(activeFilter));

  return (
    <div className="min-h-screen bg-chef-soft-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-montserrat font-bold mb-4">Your Personalized Recipes</h1>
          <p className="text-lg font-roboto text-gray-600 max-w-3xl mx-auto">
            Discover delicious meals based on your ingredients and preferences.
          </p>
        </motion.div>
        
        {/* Filter Section */}
        <div className="mb-10 flex flex-wrap gap-3 justify-center">
          {filterOptions.map((filter) => (
            <FilterButton 
              key={filter.id}
              active={activeFilter === filter.id}
              color={filter.color}
              onClick={() => handleFilterChange(filter.id)}
            >
              {filter.label}
            </FilterButton>
          ))}
        </div>
        
        {/* Recipe Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onFavoriteToggle={() => toggleFavorite(recipe.id)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <p className="text-xl font-montserrat text-gray-500">
                No recipes found matching your filter.
              </p>
              <Button 
                onClick={() => setActiveFilter("all")} 
                variant="outline"
                className="mt-4"
              >
                Clear Filter
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default RecipesPage;
