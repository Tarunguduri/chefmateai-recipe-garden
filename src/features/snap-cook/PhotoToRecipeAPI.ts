
import mockRecipes from '@/data/mock-recipes.json';
import mockUserPreferences from '@/data/mock-user-preferences.json';

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
 * Stub for generating a recipe from an image
 * @param imageData Base64 encoded image data
 */
export const generateRecipeFromImage = async (imageData: string): Promise<Recipe> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Randomly select a recipe from mock data
      const randomIndex = Math.floor(Math.random() * mockRecipes.length);
      resolve(mockRecipes[randomIndex] as Recipe);
    }, 3000); // Longer delay to simulate AI processing
  });
};

/**
 * Stub for analyzing image and extracting ingredients
 * @param imageData Base64 encoded image data
 */
export const analyzeImageIngredients = async (imageData: string): Promise<string[]> => {
  return new Promise((resolve) => {
    // Simulate processing delay
    setTimeout(() => {
      // Get ingredients from a random recipe
      const randomIndex = Math.floor(Math.random() * mockRecipes.length);
      resolve(mockRecipes[randomIndex].detectedIngredients);
    }, 2000);
  });
};
