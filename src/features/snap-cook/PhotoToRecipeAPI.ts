
import mockRecipes from '@/data/mock-recipes.json';
import mockUserPreferences from '@/data/mock-user-preferences.json';
import { ingredientModel } from '@/ml-models/ingredient-recognition/ModelService';
import type { IngredientPrediction } from '@/ml-models/ingredient-recognition/types';

// Types
export type UserPreferences = {
  goal: string;
  allergies: string[];
  dietaryRestrictions: string[];
  preferredCuisine: string[];
  spiceLevel: string;
  mealSize: string;
  proteinPreference: string;
}

export type Recipe = {
  id: number;
  title: string;
  image?: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  cookingTime: number;
  detectedIngredients: string[];
  instructions: string[];
  preferences: {
    goal: string;
    cuisine: string;
    dietaryRestrictions: string[];
  };
}

/**
 * Stub for fetching user preferences
 */
export const fetchUserPreferences = async (): Promise<UserPreferences> => {
  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      resolve(mockUserPreferences.dietaryPreferences);
    }, 800);
  });
};

/**
 * Generate a recipe based on detected ingredients and user preferences
 * @param ingredients List of detected ingredients
 * @param userPreferences User dietary preferences
 */
const generateRecipeFromIngredients = (
  ingredients: string[], 
  userPreferences: UserPreferences
): Recipe => {
  // In a real implementation, this would use an AI model or API
  // to generate a recipe based on ingredients and preferences
  
  // For now, find a mock recipe that has the most ingredient matches
  let bestMatch = mockRecipes[0];
  let maxMatchCount = 0;
  
  mockRecipes.forEach(recipe => {
    const matchCount = recipe.detectedIngredients.filter(
      ing => ingredients.includes(ing)
    ).length;
    
    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      bestMatch = recipe;
    }
  });
  
  // Add the user's preferences to the recipe
  return {
    ...bestMatch,
    preferences: {
      goal: userPreferences.goal,
      cuisine: userPreferences.preferredCuisine[0] || 'General',
      dietaryRestrictions: userPreferences.dietaryRestrictions,
    }
  };
};

/**
 * Generate a recipe from an image
 * @param imageData Base64 encoded image data
 */
export const generateRecipeFromImage = async (imageData: string): Promise<Recipe> => {
  try {
    // Step 1: Analyze the image for ingredients
    const ingredients = await analyzeImageIngredients(imageData);
    
    // Step 2: Fetch user preferences
    const preferences = await fetchUserPreferences();
    
    // Step 3: Generate a recipe based on ingredients and preferences
    return generateRecipeFromIngredients(ingredients, preferences);
  } catch (error) {
    console.error('Error generating recipe:', error);
    throw new Error('Failed to generate recipe from image');
  }
};

/**
 * Analyze image and extract ingredients using ML model
 * @param imageData Base64 encoded image data
 */
export const analyzeImageIngredients = async (imageData: string): Promise<string[]> => {
  try {
    console.log('Analyzing image for ingredients...');
    
    // Use the ML model to identify ingredients
    const predictions: IngredientPrediction[] = await ingredientModel.identifyIngredients(imageData);
    
    // Filter predictions by confidence threshold
    const CONFIDENCE_THRESHOLD = 0.7;
    const detectedIngredients = predictions
      .filter(pred => pred.confidence > CONFIDENCE_THRESHOLD)
      .map(pred => pred.name);
    
    console.log('Detected ingredients:', detectedIngredients);
    
    return detectedIngredients;
  } catch (error) {
    console.error('Error analyzing image:', error);
    
    // Fallback to mock data if model fails
    console.log('Falling back to mock data');
    const randomIndex = Math.floor(Math.random() * mockRecipes.length);
    return mockRecipes[randomIndex].detectedIngredients;
  }
};
