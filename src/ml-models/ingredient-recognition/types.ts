
/**
 * Represents a predicted ingredient with confidence score
 */
export interface IngredientPrediction {
  name: string;       // Name of the identified ingredient
  confidence: number; // Confidence score (0-1)
}

/**
 * Configuration for the ingredient recognition model
 */
export interface ModelConfig {
  threshold?: number; // Confidence threshold for ingredient detection
  maxPredictions?: number; // Maximum number of predictions to return
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
}
