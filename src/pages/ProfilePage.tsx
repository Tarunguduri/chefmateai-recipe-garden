
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client"; 
import { toast } from "sonner";

const ProfilePage = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    goal: "weightLoss",
    dietaryPreferences: [] as string[],
    activityLevel: 2,
    allergies: "",
    cuisinePreferences: [] as string[],
  });
  const [loading, setLoading] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);

  const totalSteps = 5; // Added one more step for cuisine preferences

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setFormData({
          name: data.name || "",
          age: data.age ? data.age.toString() : "",
          goal: data.goal || "weightLoss",
          dietaryPreferences: data.dietary_preferences || [],
          activityLevel: data.activity_level || 2,
          allergies: data.allergies || "",
          cuisinePreferences: data.cuisine_preferences || [],
        });
        setProfileLoaded(true);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGoalChange = (value: string) => {
    setFormData({
      ...formData,
      goal: value,
    });
  };

  const handleDietaryPreferenceToggle = (preference: string) => {
    const updatedPreferences = formData.dietaryPreferences.includes(preference)
      ? formData.dietaryPreferences.filter(item => item !== preference)
      : [...formData.dietaryPreferences, preference];
      
    setFormData({
      ...formData,
      dietaryPreferences: updatedPreferences,
    });
  };

  const handleCuisinePreferenceToggle = (cuisine: string) => {
    const updatedCuisines = formData.cuisinePreferences.includes(cuisine)
      ? formData.cuisinePreferences.filter(item => item !== cuisine)
      : [...formData.cuisinePreferences, cuisine];
      
    setFormData({
      ...formData,
      cuisinePreferences: updatedCuisines,
    });
  };

  const handleSliderChange = (value: number[]) => {
    setFormData({
      ...formData,
      activityLevel: value[0],
    });
  };

  const saveProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: user.id,
          name: formData.name,
          age: formData.age ? parseInt(formData.age) : null,
          goal: formData.goal,
          dietary_preferences: formData.dietaryPreferences,
          activity_level: formData.activityLevel,
          allergies: formData.allergies,
          cuisine_preferences: formData.cuisinePreferences,
          updated_at: new Date().toISOString()
        });

      if (error) throw error;
      toast.success("Profile saved successfully!");
    } catch (error: any) {
      toast.error("Error saving profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const dietaryPreferences = [
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "glutenFree", label: "Gluten Free" },
    { id: "dairyFree", label: "Dairy Free" },
    { id: "keto", label: "Keto" },
    { id: "paleo", label: "Paleo" },
  ];

  const cuisineTypes = [
    { id: "italian", label: "Italian" },
    { id: "mexican", label: "Mexican" },
    { id: "indian", label: "Indian" },
    { id: "chinese", label: "Chinese" },
    { id: "japanese", label: "Japanese" },
    { id: "thai", label: "Thai" },
    { id: "mediterranean", label: "Mediterranean" },
    { id: "french", label: "French" },
    { id: "american", label: "American" },
    { id: "middleEastern", label: "Middle Eastern" },
  ];

  const activityLabels = ["Sedentary", "Lightly Active", "Moderately Active", "Very Active", "Extremely Active"];

  // Progress values for the visual progress bars
  const progressValues = {
    weightLoss: [70, 40, 60],
    weightGain: [50, 70, 60],
    maintenance: [60, 60, 60],
  };

  const selectedProgress = progressValues[formData.goal as keyof typeof progressValues];

  return (
    <div className="min-h-screen bg-chef-soft-gray py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-montserrat font-bold mb-4">Set Up Your Profile</h1>
          <p className="text-lg font-roboto text-gray-600">
            Help us personalize your recipe recommendations and meal plans.
          </p>
        </motion.div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between max-w-xs mx-auto">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <motion.div 
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className={`h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    index + 1 === currentStep 
                      ? "bg-chef-bright-orange text-white" 
                      : index + 1 < currentStep 
                        ? "bg-green-500 text-white" 
                        : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {index + 1 < currentStep ? <CheckCircle className="h-5 w-5" /> : index + 1}
                </div>
                <span className="text-xs mt-1 font-medium">Step {index + 1}</span>
              </motion.div>
            ))}
          </div>
          <div className="relative h-1 bg-gray-200 max-w-xs mx-auto mt-2">
            <div 
              className="absolute h-1 bg-chef-bright-orange transition-all duration-300" 
              style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-base">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="age" className="text-base">Your Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="Enter your age"
                    className="mt-1"
                  />
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Step 2: Dietary Goals */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Your Dietary Goals</h2>
              <RadioGroup 
                value={formData.goal} 
                onValueChange={handleGoalChange}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <Label 
                  htmlFor="weightLoss" 
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.goal === 'weightLoss' ? 'border-chef-bright-orange bg-chef-soft-peach' : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value="weightLoss" id="weightLoss" className="sr-only" />
                  <span className="text-4xl mb-2">🏃‍♂️</span>
                  <span className="font-medium text-center">Weight Loss</span>
                </Label>
                <Label 
                  htmlFor="maintenance" 
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.goal === 'maintenance' ? 'border-chef-bright-orange bg-chef-soft-peach' : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value="maintenance" id="maintenance" className="sr-only" />
                  <span className="text-4xl mb-2">⚖️</span>
                  <span className="font-medium text-center">Maintenance</span>
                </Label>
                <Label 
                  htmlFor="weightGain" 
                  className={`flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                    formData.goal === 'weightGain' ? 'border-chef-bright-orange bg-chef-soft-peach' : 'border-gray-200'
                  }`}
                >
                  <RadioGroupItem value="weightGain" id="weightGain" className="sr-only" />
                  <span className="text-4xl mb-2">💪</span>
                  <span className="font-medium text-center">Weight Gain</span>
                </Label>
              </RadioGroup>
              
              {/* Progress bars visualization */}
              <div className="mt-8">
                <h3 className="text-lg font-medium mb-4">Your Nutrition Balance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Protein</span>
                      <span>{selectedProgress[0]}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProgress[0]}%` }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="h-full bg-blue-500"
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Carbs</span>
                      <span>{selectedProgress[1]}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProgress[1]}%` }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="h-full bg-green-500"
                      ></motion.div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Fats</span>
                      <span>{selectedProgress[2]}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${selectedProgress[2]}%` }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="h-full bg-yellow-500"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Step 3: Dietary Preferences */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Dietary Preferences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {dietaryPreferences.map((preference) => (
                  <Card 
                    key={preference.id}
                    className={`border-2 cursor-pointer transition-all duration-200 hover:shadow ${
                      formData.dietaryPreferences.includes(preference.id) 
                        ? 'border-chef-bright-orange bg-chef-soft-peach' 
                        : 'border-transparent'
                    }`}
                    onClick={() => handleDietaryPreferenceToggle(preference.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-center h-full">
                      <span className="font-medium text-center">{preference.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8">
                <Label htmlFor="activityLevel" className="text-base mb-4 block">
                  Activity Level: <span className="font-medium">{activityLabels[formData.activityLevel - 1]}</span>
                </Label>
                <Slider
                  id="activityLevel"
                  defaultValue={[formData.activityLevel]}
                  value={[formData.activityLevel]}
                  min={1}
                  max={5}
                  step={1}
                  onValueChange={handleSliderChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  {activityLabels.map((label, index) => (
                    <div key={index} className="text-center">
                      <div className={`h-1.5 w-1.5 rounded-full mx-auto mb-1 ${index + 1 <= formData.activityLevel ? 'bg-chef-bright-orange' : 'bg-gray-300'}`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Cuisine Preferences (New step) */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Cuisine Preferences</h2>
              <p className="text-gray-600 mb-4">Select the cuisines you enjoy most:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {cuisineTypes.map((cuisine) => (
                  <Card 
                    key={cuisine.id}
                    className={`border-2 cursor-pointer transition-all duration-200 hover:shadow ${
                      formData.cuisinePreferences.includes(cuisine.id) 
                        ? 'border-chef-bright-orange bg-chef-soft-peach' 
                        : 'border-transparent'
                    }`}
                    onClick={() => handleCuisinePreferenceToggle(cuisine.id)}
                  >
                    <CardContent className="p-4 flex items-center justify-center h-full">
                      <span className="font-medium text-center">{cuisine.label}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                Your cuisine preferences help us tailor recipe recommendations to your taste
              </p>
            </motion.div>
          )}
          
          {/* Step 5: Allergies & Finish */}
          {currentStep === 5 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6"
            >
              <h2 className="text-2xl font-montserrat font-semibold mb-6">Food Allergies</h2>
              <div>
                <Label htmlFor="allergies" className="text-base">List any food allergies or ingredients to avoid</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="e.g. peanuts, shellfish, etc."
                  className="mt-1"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Separate multiple allergies with commas
                </p>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Profile Summary</h3>
                <div className="bg-chef-soft-blue p-4 rounded-lg">
                  <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                    <div className="flex flex-col">
                      <dt className="text-sm text-gray-500">Name</dt>
                      <dd className="font-medium">{formData.name || "Not specified"}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm text-gray-500">Age</dt>
                      <dd className="font-medium">{formData.age || "Not specified"}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm text-gray-500">Goal</dt>
                      <dd className="font-medium capitalize">{formData.goal.replace(/([A-Z])/g, ' $1').trim()}</dd>
                    </div>
                    <div className="flex flex-col">
                      <dt className="text-sm text-gray-500">Activity Level</dt>
                      <dd className="font-medium">{activityLabels[formData.activityLevel - 1]}</dd>
                    </div>
                    <div className="flex flex-col col-span-full">
                      <dt className="text-sm text-gray-500">Dietary Preferences</dt>
                      <dd className="font-medium">
                        {formData.dietaryPreferences.length > 0 
                          ? formData.dietaryPreferences.map(pref => 
                              dietaryPreferences.find(p => p.id === pref)?.label
                            ).join(", ")
                          : "None specified"}
                      </dd>
                    </div>
                    <div className="flex flex-col col-span-full">
                      <dt className="text-sm text-gray-500">Cuisine Preferences</dt>
                      <dd className="font-medium">
                        {formData.cuisinePreferences.length > 0 
                          ? formData.cuisinePreferences.map(cuisine => 
                              cuisineTypes.find(c => c.id === cuisine)?.label
                            ).join(", ")
                          : "None specified"}
                      </dd>
                    </div>
                    <div className="flex flex-col col-span-full">
                      <dt className="text-sm text-gray-500">Allergies</dt>
                      <dd className="font-medium">{formData.allergies || "None specified"}</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </motion.div>
          )}
          
          {/* Navigation Buttons */}
          <div className="px-6 py-4 bg-gray-50 border-t flex justify-between">
            {currentStep > 1 ? (
              <Button
                variant="outline"
                onClick={handlePrevious}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              onClick={currentStep < totalSteps ? handleNext : saveProfile}
              className="bg-chef-bright-orange hover:bg-opacity-90"
              disabled={loading}
            >
              {loading 
                ? "Saving..." 
                : currentStep < totalSteps 
                  ? "Continue" 
                  : "Save Profile"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
