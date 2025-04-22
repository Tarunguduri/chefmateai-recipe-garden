
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Recipe {
  id: number;
  name: string;
  image: string;
  description: string;
  tags: string[];
  time: string;
  calories: number;
  isFavorite: boolean;
}

interface RecipeDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  recipe: Recipe;
  onFavoriteToggle: () => void;
}

const RecipeDetailModal = ({ isOpen, onClose, recipe, onFavoriteToggle }: RecipeDetailModalProps) => {
  // Mock recipe details
  const ingredients = [
    "2 cups pasta",
    "1 cup mixed vegetables",
    "2 tbsp olive oil",
    "3 cloves garlic, minced",
    "1/4 cup parmesan cheese",
    "Salt and pepper to taste"
  ];

  const instructions = [
    "Boil pasta according to package instructions.",
    "In a large pan, heat olive oil over medium heat.",
    "Add garlic and sauté until fragrant, about 30 seconds.",
    "Add vegetables and cook until tender, about 5 minutes.",
    "Drain pasta and add to the pan with vegetables.",
    "Toss to combine and season with salt and pepper.",
    "Serve hot with a sprinkle of parmesan cheese."
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl overflow-hidden">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-montserrat font-bold">{recipe.name}</DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
              className="rounded-full p-2 hover:bg-chef-soft-peach"
            >
              <Heart 
                className={`h-6 w-6 ${recipe.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
              />
            </Button>
          </div>
          <DialogDescription className="text-lg text-gray-600 mt-2">
            {recipe.description}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-64 object-cover rounded-lg" 
            />
            
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-chef-soft-blue rounded-md">
                <p className="text-sm font-semibold">Time</p>
                <p className="text-lg">{recipe.time}</p>
              </div>
              <div className="p-2 bg-chef-soft-green rounded-md">
                <p className="text-sm font-semibold">Calories</p>
                <p className="text-lg">{recipe.calories}</p>
              </div>
              <div className="p-2 bg-chef-soft-yellow rounded-md">
                <p className="text-sm font-semibold">Servings</p>
                <p className="text-lg">2</p>
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-montserrat font-semibold mb-3">Ingredients</h3>
              <ul className="space-y-2">
                {ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center font-roboto"
                  >
                    <span className="h-2 w-2 bg-chef-bright-orange rounded-full mr-2"></span>
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-montserrat font-semibold mb-3">Instructions</h3>
            <ol className="space-y-4">
              {instructions.map((instruction, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex font-roboto"
                >
                  <span className="flex-shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-chef-bright-orange text-white text-sm mr-3 mt-0.5">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </motion.li>
              ))}
            </ol>
            
            <div className="mt-8">
              <h3 className="text-xl font-montserrat font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-chef-soft-peach text-chef-bright-orange rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailModal;
