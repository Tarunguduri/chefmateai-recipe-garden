
/**
 * Represents a predicted ingredient with confidence score
 */
export interface IngredientPrediction {
  name: string;       // Name of the identified ingredient
  confidence: number; // Confidence score (0-1)
  category?: string;  // Optional category (e.g., protein, vegetable)
  nutritionalValue?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
}

/**
 * Configuration for the ingredient recognition model
 */
export interface ModelConfig {
  threshold?: number;      // Confidence threshold for ingredient detection
  maxPredictions?: number; // Maximum number of predictions to return
  preferredCategories?: string[]; // Categories to prioritize in results
  excludedIngredients?: string[]; // Ingredients to exclude from results
}

/**
 * Metadata for the model
 */
export interface ModelMetadata {
  name: string;
  version: string;
  lastUpdated: string;
  categories: string[];
  accuracy: number;
  supportedIngredients: number; // Total number of ingredients the model can identify
  datasetSize?: number;         // Size of training dataset
  inferenceTime?: number;       // Average inference time in ms
}

/**
 * User nutritional preferences for recipe generation
 */
export interface NutritionalPreference {
  goal: 'weight_loss' | 'weight_gain' | 'maintenance' | 'muscle_building';
  calorieTarget?: number;
  macroRatios?: {
    protein: number; // Percentage
    carbs: number;   // Percentage
    fat: number;     // Percentage
  };
  dietaryRestrictions?: string[];
  allergies?: string[];
  cuisinePreferences?: string[];
}

/**
 * Result from the ingredient recognition process
 */
export interface IngredientAnalysisResult {
  ingredients: IngredientPrediction[];
  processingTime: number;
  imageQuality: 'low' | 'medium' | 'high';
  possibleDishes?: string[];
  confidence: number; // Overall confidence of the analysis
}
