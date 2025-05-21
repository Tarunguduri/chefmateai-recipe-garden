
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { ChevronLeft, Clock, Printer, Share2, Bookmark, Check } from 'lucide-react';
import { Recipe } from './PhotoToRecipeAPI';
import { toast } from 'sonner';

interface AnalyzeResultProps {
  recipe: Recipe;
  image: string | null;
  onBack: () => void;
}

export const AnalyzeResult = ({ recipe, image, onBack }: AnalyzeResultProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    toast.success('Recipe saved to your collection!');
  };

  const handleShare = () => {
    toast.success('Recipe link copied to clipboard!');
  };

  const handlePrint = () => {
    window.print();
    toast.success('Sending to printer...');
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 0.5 }}
      >
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6 flex items-center gap-2"
        >
          <ChevronLeft size={16} />
          Back to Image
        </Button>

        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Recipe Image */}
            <Card className="overflow-hidden">
              {image && (
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={image} 
                    alt="Food ingredients" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </Card>

            {/* Recipe Info */}
            <Card className="p-6">
              <h1 className="text-2xl font-montserrat font-bold mb-3">
                {recipe.title}
              </h1>
              
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <Clock size={16} />
                <span>{recipe.cookingTime} minutes</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-3 bg-chef-soft-yellow rounded-md">
                  <h4 className="text-sm text-gray-500">Calories</h4>
                  <p className="font-semibold">{recipe.calories}</p>
                </div>
                <div className="text-center p-3 bg-chef-soft-blue rounded-md">
                  <h4 className="text-sm text-gray-500">Protein</h4>
                  <p className="font-semibold">{recipe.protein}g</p>
                </div>
                <div className="text-center p-3 bg-chef-soft-green rounded-md">
                  <h4 className="text-sm text-gray-500">Carbs</h4>
                  <p className="font-semibold">{recipe.carbs}g</p>
                </div>
              </div>

              <div className="flex gap-2 mt-auto">
                <Button variant="outline" size="sm" onClick={handlePrint}>
                  <Printer size={16} className="mr-1" />
                  Print
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 size={16} className="mr-1" />
                  Share
                </Button>
                <Button 
                  variant={isSaved ? "default" : "outline"} 
                  size="sm" 
                  onClick={handleSave}
                  className={isSaved ? "bg-chef-bright-orange" : ""}
                >
                  {isSaved ? (
                    <>
                      <Check size={16} className="mr-1" />
                      Saved
                    </>
                  ) : (
                    <>
                      <Bookmark size={16} className="mr-1" />
                      Save
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item} className="grid md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6 md:col-span-1">
              <h2 className="font-montserrat font-semibold text-lg mb-3">
                Detected Ingredients
              </h2>
              <div className="flex flex-wrap gap-2">
                {recipe.detectedIngredients.map((ingredient, index) => (
                  <Badge key={index} variant="outline" className="bg-chef-soft-peach">
                    {ingredient}
                  </Badge>
                ))}
              </div>
            </Card>

            <Card className="p-6 md:col-span-2">
              <h2 className="font-montserrat font-semibold text-lg mb-3">
                Recipe Details
              </h2>
              <div className="mb-4">
                <p className="text-gray-600">
                  This recipe was personalized based on your dietary preferences:
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {recipe.preferences.goal && (
                    <Badge className="bg-chef-soft-purple">
                      Goal: {recipe.preferences.goal}
                    </Badge>
                  )}
                  {recipe.preferences.cuisine && (
                    <Badge className="bg-chef-soft-blue">
                      Cuisine: {recipe.preferences.cuisine}
                    </Badge>
                  )}
                  {recipe.preferences.dietaryRestrictions?.map((restriction, index) => (
                    <Badge key={index} className="bg-chef-soft-pink">
                      {restriction}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card className="p-6">
              <h2 className="font-montserrat font-semibold text-lg mb-4">
                Cooking Instructions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {recipe.instructions.map((step, index) => (
                  <AccordionItem key={index} value={`step-${index + 1}`}>
                    <AccordionTrigger className="hover:bg-chef-soft-gray px-4">
                      Step {index + 1}
                    </AccordionTrigger>
                    <AccordionContent className="px-4 py-2">
                      {step}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>
          </motion.div>

          <motion.div variants={item} className="mt-8 text-center">
            <p className="text-gray-500 mb-4">
              Want more recipes like this? Update your preferences in your profile.
            </p>
            <Button className="bg-chef-bright-orange hover:bg-opacity-90">
              Try Another Recipe
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};
