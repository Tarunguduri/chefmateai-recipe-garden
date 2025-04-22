
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import { motion } from "framer-motion";

const HomePage = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <div 
        className="min-h-[90vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FEC6A1 0%, #FEF7CD 100%)"
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-montserrat font-bold text-gray-800 mb-6">
            Create Delicious Recipes with Your Available Ingredients
          </h1>
          <p className="text-xl md:text-2xl font-roboto text-gray-700 mb-8 max-w-3xl mx-auto">
            ChefMateAI transforms your ingredients into personalized recipes tailored to your preferences and dietary needs.
          </p>
          
          {/* Upload Button with Animation */}
          <div className="relative">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                size="lg"
                className="bg-chef-bright-orange hover:bg-gradient-to-r from-chef-bright-orange to-orange-500 text-white font-montserrat text-lg py-6 px-8 rounded-xl shadow-lg flex items-center gap-3 transition-all duration-200"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(true)}
              >
                <Camera className="h-6 w-6" />
                Upload Your Ingredients
              </Button>
            </motion.div>
            
            {/* Floating Tooltip */}
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute mt-4 p-4 bg-white rounded-lg shadow-xl text-left max-w-sm mx-auto left-1/2 transform -translate-x-1/2 z-10"
              >
                <h3 className="font-montserrat font-semibold text-lg mb-2 text-gray-800">How it works:</h3>
                <ol className="font-roboto text-gray-600 text-sm space-y-2 list-decimal list-inside">
                  <li>Snap a photo of your ingredients or upload an image</li>
                  <li>Our AI identifies the ingredients automatically</li>
                  <li>Get personalized recipe suggestions in seconds</li>
                </ol>
                <Button 
                  variant="ghost" 
                  className="text-xs mt-3 text-chef-bright-orange hover:bg-chef-soft-peach"
                  onClick={() => setShowTooltip(false)}
                >
                  Got it!
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        {/* Background Decorative Elements */}
        <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-chef-soft-green opacity-50"></div>
        <div className="absolute top-20 -left-20 w-48 h-48 rounded-full bg-chef-soft-purple opacity-40"></div>
      </div>
      
      {/* Featured Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-montserrat font-bold text-center mb-12">How ChefMateAI Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                title: "Upload Your Ingredients", 
                description: "Take a photo of your available ingredients or manually input them.", 
                icon: "📸",
                color: "bg-chef-soft-blue" 
              },
              { 
                title: "Get Personalized Recipes", 
                description: "Our AI suggests recipes based on your ingredients and dietary preferences.", 
                icon: "🍲",
                color: "bg-chef-soft-yellow" 
              },
              { 
                title: "Cook & Enjoy", 
                description: "Follow the step-by-step instructions and enjoy your delicious meal.", 
                icon: "👨‍🍳",
                color: "bg-chef-soft-green" 
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`${feature.color} p-6 rounded-xl text-center`}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-montserrat font-semibold mb-3">{feature.title}</h3>
                <p className="font-roboto text-gray-700">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
