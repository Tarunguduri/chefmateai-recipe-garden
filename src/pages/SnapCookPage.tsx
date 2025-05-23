
import { useEffect, useState } from "react";
import ImageCapture from "@/features/snap-cook/ImageCapture";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InfoIcon, Settings, Camera, Utensils, FileText } from "lucide-react";
import { ingredientModel } from "@/ml-models/ingredient-recognition/ModelService";
import { NutritionalPreference } from "@/ml-models/ingredient-recognition/types";
import { motion } from "framer-motion";

const SnapCookPage = () => {
  const [modelStatus, setModelStatus] = useState<"loading" | "ready" | "error">("loading");
  const [activeTab, setActiveTab] = useState<string>("capture");
  const [userPreferences, setUserPreferences] = useState<NutritionalPreference>({
    goal: 'weight_loss',
    dietaryRestrictions: [],
    allergies: [],
    cuisinePreferences: []
  });

  useEffect(() => {
    const initializeModel = async () => {
      try {
        setModelStatus("loading");
        
        // Initialize model with custom configuration
        await ingredientModel.initialize({
          threshold: 0.65,  // Lower threshold for more ingredients
          maxPredictions: 8 // Maximum ingredients to display
        });
        
        setModelStatus("ready");
      } catch (error) {
        console.error("Failed to initialize ingredient recognition model:", error);
        setModelStatus("error");
      }
    };

    initializeModel();
    
    // Load user preferences - in a real app this would come from an API or local storage
    const loadUserPreferences = async () => {
      // Simulate API call
      setTimeout(() => {
        setUserPreferences({
          goal: 'weight_loss',
          calorieTarget: 1800,
          macroRatios: {
            protein: 30,
            carbs: 40,
            fat: 30
          },
          dietaryRestrictions: ['vegetarian'],
          allergies: ['peanuts'],
          cuisinePreferences: ['mediterranean', 'asian']
        });
      }, 800);
    };
    
    loadUserPreferences();
  }, []);
  
  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <motion.div 
      className="container mx-auto py-6 px-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Card className="mb-6 overflow-hidden border-chef-bright-orange/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-chef-bright-orange to-chef-soft-orange text-white">
          <CardTitle className="text-2xl font-montserrat">Snap & Cook AI</CardTitle>
          <CardDescription className="text-white/90">
            Take a photo of your ingredients and get personalized recipe suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          {modelStatus === "loading" && (
            <Alert className="mb-4 bg-amber-50 border-amber-200">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Loading ingredient recognition model</AlertTitle>
              <AlertDescription>
                Please wait while we load the AI model for ingredient recognition...
              </AlertDescription>
            </Alert>
          )}
          
          {modelStatus === "error" && (
            <Alert className="mb-4 bg-red-50 border-red-200">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Model loading failed</AlertTitle>
              <AlertDescription>
                Could not load the ingredient recognition model. Using fallback method.
              </AlertDescription>
            </Alert>
          )}
          
          {modelStatus === "ready" && (
            <motion.div variants={itemVariants}>
              <Alert className="mb-4 bg-green-50 border-green-200">
                <InfoIcon className="h-4 w-4" />
                <AlertTitle>AI model ready</AlertTitle>
                <AlertDescription>
                  The ingredient recognition model is loaded and ready to analyze your images.
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          <Tabs defaultValue="capture" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="capture" className="flex items-center gap-2">
                <Camera className="h-4 w-4" />
                <span>Capture</span>
              </TabsTrigger>
              <TabsTrigger value="recipes" className="flex items-center gap-2">
                <Utensils className="h-4 w-4" />
                <span>Recipes</span>
              </TabsTrigger>
              <TabsTrigger value="preferences" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span>Preferences</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="capture" className="mt-0">
              <motion.div variants={itemVariants}>
                <ImageCapture userPreferences={userPreferences} />
              </motion.div>
            </TabsContent>
            
            <TabsContent value="recipes" className="mt-0">
              <motion.div 
                variants={itemVariants}
                className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg"
              >
                <Utensils className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-700">No Recipes Yet</h3>
                <p className="text-gray-500 mt-2">
                  Take a photo of your ingredients first to get personalized recipes
                </p>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="preferences" className="mt-0">
              <motion.div 
                variants={itemVariants}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold">Nutritional Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nutritional Goal
                    </label>
                    <select 
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={userPreferences.goal}
                      onChange={(e) => setUserPreferences({
                        ...userPreferences, 
                        goal: e.target.value as any
                      })}
                    >
                      <option value="weight_loss">Weight Loss</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="weight_gain">Weight Gain</option>
                      <option value="muscle_building">Muscle Building</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Daily Calorie Target
                    </label>
                    <input
                      type="number"
                      className="w-full rounded-md border border-gray-300 px-3 py-2"
                      value={userPreferences.calorieTarget || 2000}
                      onChange={(e) => setUserPreferences({
                        ...userPreferences,
                        calorieTarget: parseInt(e.target.value)
                      })}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dietary Restrictions
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'keto'].map(diet => (
                        <label key={diet} className="flex items-center">
                          <input
                            type="checkbox"
                            className="mr-1"
                            checked={userPreferences.dietaryRestrictions?.includes(diet) || false}
                            onChange={(e) => {
                              const current = userPreferences.dietaryRestrictions || [];
                              setUserPreferences({
                                ...userPreferences,
                                dietaryRestrictions: e.target.checked 
                                  ? [...current, diet]
                                  : current.filter(d => d !== diet)
                              });
                            }}
                          />
                          <span className="capitalize">{diet}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-sm text-gray-500 bg-gray-50 border-t">
          <div className="flex justify-between items-center w-full">
            <span>Our AI can identify over 100 common ingredients</span>
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {modelStatus === "ready" ? "Model Active" : "Loading Model..."}
            </span>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default SnapCookPage;
