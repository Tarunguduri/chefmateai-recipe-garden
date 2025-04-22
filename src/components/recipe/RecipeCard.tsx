
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import RecipeDetailModal from "./RecipeDetailModal";

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

interface RecipeCardProps {
  recipe: Recipe;
  onFavoriteToggle: () => void;
}

const RecipeCard = ({ recipe, onFavoriteToggle }: RecipeCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Array of pastel colors for recipe cards
  const cardColors = [
    "bg-chef-soft-green",
    "bg-chef-soft-pink",
    "bg-chef-soft-blue",
    "bg-chef-soft-yellow",
    "bg-chef-soft-purple",
    "bg-chef-soft-peach",
  ];
  
  // Select a color based on recipe id
  const cardColor = cardColors[recipe.id % cardColors.length];

  return (
    <>
      <motion.div 
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <Card className={`overflow-hidden shadow-md transition-all duration-200 hover:shadow-xl ${cardColor}`}>
          <div className="relative h-48 overflow-hidden">
            <img 
              src={recipe.image} 
              alt={recipe.name} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full p-1.5"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
            >
              <Heart 
                className={`h-5 w-5 ${recipe.isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
              />
            </Button>
          </div>
          <CardContent className="p-5">
            <h3 className="font-montserrat font-semibold text-xl mb-2">{recipe.name}</h3>
            <p className="font-roboto text-gray-700 text-sm mb-4 line-clamp-2">
              {recipe.description}
            </p>
            <div className="flex items-center justify-between text-sm font-roboto text-gray-600">
              <span>⏱️ {recipe.time}</span>
              <span>🔥 {recipe.calories} cal</span>
            </div>
          </CardContent>
          <CardFooter className="px-5 pb-5 pt-0">
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-chef-bright-orange hover:bg-opacity-90 text-white"
            >
              View Recipe
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <RecipeDetailModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={recipe}
        onFavoriteToggle={onFavoriteToggle}
      />
    </>
  );
};

export default RecipeCard;
