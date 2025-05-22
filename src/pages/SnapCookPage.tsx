
import { useEffect, useState } from "react";
import ImageCapture from "@/features/snap-cook/ImageCapture";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { ingredientModel } from "@/ml-models/ingredient-recognition/ModelService";

const SnapCookPage = () => {
  const [modelStatus, setModelStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const initializeModel = async () => {
      try {
        setModelStatus("loading");
        await ingredientModel.initialize();
        setModelStatus("ready");
      } catch (error) {
        console.error("Failed to initialize ingredient recognition model:", error);
        setModelStatus("error");
      }
    };

    initializeModel();
  }, []);

  return (
    <div className="container mx-auto py-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Snap & Cook AI</CardTitle>
          <CardDescription>
            Take a photo of your ingredients and get recipe suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          {modelStatus === "loading" && (
            <Alert className="mb-4 bg-amber-50">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Loading ingredient recognition model</AlertTitle>
              <AlertDescription>
                Please wait while we load the AI model for ingredient recognition...
              </AlertDescription>
            </Alert>
          )}
          
          {modelStatus === "error" && (
            <Alert className="mb-4 bg-red-50">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>Model loading failed</AlertTitle>
              <AlertDescription>
                Could not load the ingredient recognition model. Using fallback method.
              </AlertDescription>
            </Alert>
          )}
          
          {modelStatus === "ready" && (
            <Alert className="mb-4 bg-green-50">
              <InfoIcon className="h-4 w-4" />
              <AlertTitle>AI model ready</AlertTitle>
              <AlertDescription>
                The ingredient recognition model is loaded and ready to analyze your images.
              </AlertDescription>
            </Alert>
          )}
          
          <ImageCapture />
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Our AI can identify over 100 common ingredients from your photos!
        </CardFooter>
      </Card>
    </div>
  );
};

export default SnapCookPage;
