
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Apple, Leaf, Check } from "lucide-react";

// Days of the week
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Mock meal data
const mockMeals = {
  breakfast: [
    { id: 1, name: "Greek Yogurt with Honey and Berries", calories: 280, type: "breakfast" },
    { id: 2, name: "Avocado Toast with Egg", calories: 320, type: "breakfast" },
    { id: 3, name: "Overnight Oats with Fruit", calories: 340, type: "breakfast" },
    { id: 4, name: "Spinach and Mushroom Omelet", calories: 290, type: "breakfast" },
  ],
  lunch: [
    { id: 1, name: "Chicken Caesar Salad", calories: 380, type: "lunch" },
    { id: 2, name: "Quinoa Bowl with Roasted Vegetables", calories: 410, type: "lunch" },
    { id: 3, name: "Turkey and Avocado Wrap", calories: 450, type: "lunch" },
    { id: 4, name: "Lentil Soup with Whole Grain Bread", calories: 350, type: "lunch" },
  ],
  dinner: [
    { id: 1, name: "Grilled Salmon with Asparagus", calories: 420, type: "dinner" },
    { id: 2, name: "Stir-Fried Tofu with Vegetables", calories: 380, type: "dinner" },
    { id: 3, name: "Spaghetti with Turkey Meatballs", calories: 490, type: "dinner" },
    { id: 4, name: "Baked Chicken with Sweet Potato", calories: 450, type: "dinner" },
  ],
  snack: [
    { id: 1, name: "Apple with Almond Butter", calories: 200, type: "snack" },
    { id: 2, name: "Greek Yogurt with Berries", calories: 150, type: "snack" },
    { id: 3, name: "Trail Mix", calories: 180, type: "snack" },
    { id: 4, name: "Carrot Sticks with Hummus", calories: 120, type: "snack" },
  ]
};

// Meal type configuration
const mealTypes = [
  { type: "breakfast", icon: "🍳", color: "bg-chef-soft-yellow", label: "Breakfast" },
  { type: "lunch", icon: "🥗", color: "bg-chef-soft-green", label: "Lunch" },
  { type: "dinner", icon: "🍽️", color: "bg-chef-soft-blue", label: "Dinner" },
  { type: "snack", icon: "🍎", color: "bg-chef-soft-pink", label: "Snack" }
];

interface Meal {
  id: number;
  name: string;
  calories: number;
  type: string;
}

interface DayPlan {
  [key: string]: Meal | null;
}

const MealPlannerPage = () => {
  const [selectedDay, setSelectedDay] = useState("");
  const [selectedMealType, setSelectedMealType] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mealPlan, setMealPlan] = useState<Record<string, DayPlan>>({});
  const [autoGenerating, setAutoGenerating] = useState(false);

  // Function to open the meal selection modal
  const openMealSelection = (day: string, mealType: string) => {
    setSelectedDay(day);
    setSelectedMealType(mealType);
    setIsModalOpen(true);
  };

  // Function to select a meal for the plan
  const selectMeal = (meal: Meal) => {
    setMealPlan((prev) => ({
      ...prev,
      [selectedDay]: {
        ...(prev[selectedDay] || {}),
        [selectedMealType]: meal
      }
    }));
    setIsModalOpen(false);
  };

  // Function to auto generate a meal plan
  const generateMealPlan = () => {
    setAutoGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newPlan: Record<string, DayPlan> = {};
      
      weekdays.forEach(day => {
        newPlan[day] = {
          breakfast: getRandomMeal("breakfast"),
          lunch: getRandomMeal("lunch"),
          dinner: getRandomMeal("dinner"),
          snack: getRandomMeal("snack")
        };
      });
      
      setMealPlan(newPlan);
      setAutoGenerating(false);
    }, 1500);
  };

  // Function to get a random meal of a specific type
  const getRandomMeal = (type: string): Meal => {
    const meals = mockMeals[type as keyof typeof mockMeals];
    return meals[Math.floor(Math.random() * meals.length)];
  };

  // Function to clear a meal from the plan
  const clearMeal = (day: string, mealType: string) => {
    setMealPlan((prev) => ({
      ...prev,
      [day]: {
        ...(prev[day] || {}),
        [mealType]: null
      }
    }));
  };

  // Function to get the total calories for a day
  const getDayCalories = (day: string): number => {
    if (!mealPlan[day]) return 0;
    
    return Object.values(mealPlan[day])
      .filter(Boolean)
      .reduce((total, meal) => total + (meal?.calories || 0), 0);
  };

  // Function to check if a meal is selected for a day
  const isMealSelected = (day: string, mealType: string): boolean => {
    return !!mealPlan[day]?.[mealType];
  };

  // Pastel colors for days of the week
  const dayColors = [
    "bg-chef-soft-blue",
    "bg-chef-soft-green",
    "bg-chef-soft-pink",
    "bg-chef-soft-yellow",
    "bg-chef-soft-purple",
    "bg-chef-soft-peach",
    "bg-chef-soft-orange",
  ];

  return (
    <div className="min-h-screen bg-chef-soft-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-montserrat font-bold mb-4">Weekly Meal Planner</h1>
          <p className="text-lg font-roboto text-gray-600 max-w-3xl mx-auto">
            Plan your meals for the week or let us generate a balanced meal plan for you.
          </p>
          
          {/* Generate Meal Plan Button */}
          <motion.div
            className="mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={generateMealPlan}
              className="bg-chef-bright-orange hover:bg-opacity-90 text-white font-montserrat py-6 px-8 rounded-xl shadow-lg flex items-center gap-3 text-lg"
              disabled={autoGenerating}
            >
              {autoGenerating ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></div>
                  Generating...
                </>
              ) : (
                <>
                  ✨ Generate Meal Plan
                </>
              )}
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Weekly Calendar View */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {weekdays.map((day, index) => (
            <Card
              key={day}
              className={`overflow-hidden shadow-md border-0 ${dayColors[index]} hover:shadow-lg transition-shadow duration-200`}
            >
              <div className="p-4 border-b border-gray-100 bg-white bg-opacity-80">
                <h2 className="text-xl font-montserrat font-semibold">{day}</h2>
                {mealPlan[day] && (
                  <div className="text-sm text-gray-500 font-roboto flex items-center mt-1">
                    <span className="inline-block h-2 w-2 rounded-full mr-1.5 bg-chef-bright-orange"></span>
                    <span>
                      {getDayCalories(day)} calories
                    </span>
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-3">
                  {mealTypes.map((mealType) => (
                    <div
                      key={`${day}-${mealType.type}`}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-xl mr-2">{mealType.icon}</span>
                        <span className="font-medium">{mealType.label}</span>
                      </div>
                      
                      {isMealSelected(day, mealType.type) ? (
                        <div className="flex items-center">
                          <span className="text-sm mr-2 max-w-[140px] truncate">
                            {mealPlan[day]?.[mealType.type]?.name}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => clearMeal(day, mealType.type)}
                            className="h-6 w-6 text-gray-400 hover:text-red-500"
                          >
                            <span className="sr-only">Clear meal</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              width="16" 
                              height="16" 
                              viewBox="0 0 24 24" 
                              fill="none" 
                              stroke="currentColor" 
                              strokeWidth="2" 
                              strokeLinecap="round" 
                              strokeLinejoin="round"
                            >
                              <path d="M18 6L6 18"></path>
                              <path d="M6 6L18 18"></path>
                            </svg>
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2 border-dashed"
                          onClick={() => openMealSelection(day, mealType.type)}
                        >
                          Add Meal
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Meal Selection Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            {`Select ${selectedMealType.charAt(0).toUpperCase() + selectedMealType.slice(1)} for ${selectedDay}`}
          </DialogTitle>
          <div className="grid grid-cols-1 gap-3 mt-4">
            {selectedMealType && mockMeals[selectedMealType as keyof typeof mockMeals].map((meal) => (
              <motion.div
                key={meal.id}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => selectMeal(meal)}
              >
                <div className={`p-4 rounded-lg border hover:border-chef-bright-orange transition-colors duration-200 ${
                  mealTypes.find(type => type.type === meal.type)?.color || ""
                }`}>
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{meal.name}</h3>
                    <span className="text-sm text-gray-600">{meal.calories} cal</span>
                  </div>
                  <div className="flex items-center mt-2 text-xs text-gray-500">
                    <div className="flex items-center mr-3">
                      <Apple className="h-4 w-4 mr-1" />
                      <span>2</span>
                    </div>
                    <div className="flex items-center mr-3">
                      <Leaf className="h-4 w-4 mr-1" />
                      <span>3</span>
                    </div>
                    {meal.type === "breakfast" && (
                      <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded text-xs">Quick</span>
                    )}
                    {meal.type === "dinner" && (
                      <span className="bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded text-xs">High Protein</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MealPlannerPage;
