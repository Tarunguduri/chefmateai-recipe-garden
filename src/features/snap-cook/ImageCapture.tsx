
import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Camera, Upload, Trash2, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnalyzeResult } from './AnalyzeResult';
import { generateRecipeFromImage } from './PhotoToRecipeAPI';
import { Recipe } from './PhotoToRecipeAPI';

export const ImageCapture = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
      toast.success('Image uploaded successfully');
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = async () => {
    if (isCapturing) {
      setIsCapturing(false);
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    } else {
      setIsCapturing(true);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        toast.error('Could not access camera. Please allow camera access or use image upload instead.');
        setIsCapturing(false);
      }
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg');
    
    setImage(dataUrl);
    setIsCapturing(false);
    
    // Stop the camera
    if (videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    
    toast.success('Photo captured successfully');
  };

  const clearImage = () => {
    setImage(null);
    setRecipe(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const analyzeImage = async () => {
    if (!image) {
      toast.error('Please upload or capture an image first');
      return;
    }

    setIsAnalyzing(true);
    try {
      const generatedRecipe = await generateRecipeFromImage(image);
      setRecipe(generatedRecipe);
      toast.success('Recipe generated successfully!');
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error('Failed to analyze image. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (recipe) {
    return <AnalyzeResult recipe={recipe} image={image} onBack={() => setRecipe(null)} />;
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-montserrat font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-chef-bright-orange to-chef-soft-orange bg-clip-text text-transparent">
            Snap & Cook AI
          </span>
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Upload a photo of your ingredients, and our AI will generate a personalized recipe just for you.
        </p>

        <div className="space-y-6">
          <Card className="p-6 shadow-md">
            {!isCapturing && !image && (
              <div className="grid gap-6 md:grid-cols-2">
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline" 
                  size="lg"
                  className="h-32 border-dashed border-2 flex flex-col items-center justify-center gap-2 hover:bg-chef-soft-peach transition-all"
                >
                  <Upload size={36} className="text-chef-bright-orange" />
                  <span>Upload Image</span>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </Button>

                <Button 
                  onClick={handleCameraCapture}
                  variant="outline" 
                  size="lg"
                  className="h-32 border-dashed border-2 flex flex-col items-center justify-center gap-2 hover:bg-chef-soft-peach transition-all"
                >
                  <Camera size={36} className="text-chef-bright-orange" />
                  <span>Take Photo</span>
                </Button>
              </div>
            )}

            {isCapturing && (
              <div className="space-y-4">
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    className="w-full h-auto"
                    style={{ minHeight: "240px" }}
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <Button onClick={handleCameraCapture} variant="outline">
                    Cancel
                  </Button>
                  <Button onClick={takePhoto} className="bg-chef-bright-orange hover:bg-opacity-90">
                    Take Photo
                  </Button>
                </div>
              </div>
            )}

            {image && !isCapturing && (
              <div className="space-y-4">
                <div className="relative">
                  <img 
                    src={image} 
                    alt="Uploaded ingredients" 
                    className="w-full h-auto rounded-lg shadow-md" 
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                    onClick={clearImage}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>

                <div className="flex justify-center mt-4">
                  <Button
                    onClick={analyzeImage}
                    disabled={isAnalyzing}
                    className="bg-chef-bright-orange hover:bg-opacity-90 px-6 py-6 text-lg flex items-center gap-2"
                  >
                    {isAnalyzing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Analyzing Ingredients...
                      </>
                    ) : (
                      <>
                        Analyze Ingredients
                        <ChevronRight size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6 shadow-md bg-chef-soft-green">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Upload or take a photo of your ingredients</li>
              <li>Our AI analyzes what's in your pantry</li>
              <li>Get a personalized recipe based on your preferences</li>
              <li>Cook and enjoy your delicious meal!</li>
            </ol>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default ImageCapture;
