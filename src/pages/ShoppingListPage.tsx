
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// Mock shopping list items by category
const mockShoppingItems = {
  "Fruits & Vegetables": [
    { id: 1, name: "Apples", quantity: "5", unit: "", checked: false },
    { id: 2, name: "Carrots", quantity: "1", unit: "bunch", checked: false },
    { id: 3, name: "Spinach", quantity: "1", unit: "bag", checked: false },
    { id: 4, name: "Tomatoes", quantity: "4", unit: "", checked: false },
  ],
  "Meat & Protein": [
    { id: 5, name: "Chicken Breast", quantity: "1", unit: "lb", checked: false },
    { id: 6, name: "Eggs", quantity: "12", unit: "", checked: false },
    { id: 7, name: "Tofu", quantity: "1", unit: "block", checked: false },
  ],
  "Dairy & Alternatives": [
    { id: 8, name: "Greek Yogurt", quantity: "32", unit: "oz", checked: false },
    { id: 9, name: "Almond Milk", quantity: "1", unit: "carton", checked: false },
    { id: 10, name: "Cheddar Cheese", quantity: "8", unit: "oz", checked: false },
  ],
  "Grains & Pantry": [
    { id: 11, name: "Brown Rice", quantity: "2", unit: "cups", checked: false },
    { id: 12, name: "Quinoa", quantity: "1", unit: "cup", checked: false },
    { id: 13, name: "Olive Oil", quantity: "1", unit: "bottle", checked: false },
    { id: 14, name: "Pasta", quantity: "1", unit: "box", checked: false },
  ],
};

// Category colors
const categoryColors = {
  "Fruits & Vegetables": "bg-green-100 border-green-200 text-green-800",
  "Meat & Protein": "bg-red-100 border-red-200 text-red-800",
  "Dairy & Alternatives": "bg-blue-100 border-blue-200 text-blue-800",
  "Grains & Pantry": "bg-amber-100 border-amber-200 text-amber-800",
};

interface ShoppingItem {
  id: number;
  name: string;
  quantity: string;
  unit: string;
  checked: boolean;
}

const ShoppingListPage = () => {
  const [shoppingList, setShoppingList] = useState<Record<string, ShoppingItem[]>>(mockShoppingItems);
  const [exportBounce, setExportBounce] = useState(false);

  // Function to toggle an item's checked status
  const toggleItem = (category: string, itemId: number) => {
    setShoppingList((prev) => ({
      ...prev,
      [category]: prev[category].map((item) => 
        item.id === itemId ? { ...item, checked: !item.checked } : item
      ),
    }));
  };

  // Calculate progress percentage
  const calculateProgress = (): number => {
    let totalItems = 0;
    let checkedItems = 0;
    
    Object.values(shoppingList).forEach((categoryItems) => {
      categoryItems.forEach((item) => {
        totalItems++;
        if (item.checked) checkedItems++;
      });
    });
    
    return totalItems === 0 ? 0 : Math.round((checkedItems / totalItems) * 100);
  };

  // Handle export button click
  const handleExport = () => {
    setExportBounce(true);
    setTimeout(() => setExportBounce(false), 1000);
    
    // In a real app, this would export the list
    console.log("Exporting shopping list:", shoppingList);
    
    // Show some visual feedback
    alert("Shopping list exported!");
  };

  // Get all checked items
  const getCheckedItems = (): ShoppingItem[] => {
    const checkedItems: ShoppingItem[] = [];
    
    Object.values(shoppingList).forEach((categoryItems) => {
      categoryItems.forEach((item) => {
        if (item.checked) checkedItems.push(item);
      });
    });
    
    return checkedItems;
  };

  // Sort categories by their color
  const sortedCategories = Object.keys(shoppingList).sort();

  return (
    <div className="min-h-screen bg-chef-soft-gray py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-montserrat font-bold mb-4">Shopping List</h1>
          <p className="text-lg font-roboto text-gray-600 max-w-xl mx-auto">
            Keep track of ingredients you need for your selected recipes.
          </p>
        </motion.div>
        
        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Shopping Progress</span>
            <span className="text-sm font-medium">{calculateProgress()}%</span>
          </div>
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${calculateProgress()}%` }}
              transition={{ duration: 0.5 }}
              className={`h-full ${calculateProgress() < 100 ? 'bg-chef-bright-orange' : 'bg-green-500'}`}
            ></motion.div>
          </div>
          <div className="mt-2 text-center text-sm text-gray-500">
            {getCheckedItems().length} of {Object.values(shoppingList).flat().length} items checked
          </div>
        </div>
        
        {/* Export Button */}
        <motion.div
          className="fixed bottom-8 right-8 z-10"
          animate={exportBounce ? { y: [0, -10, 0] } : {}}
        >
          <Button
            onClick={handleExport}
            className="bg-chef-bright-orange hover:bg-opacity-90 text-white rounded-full p-4 shadow-lg flex items-center gap-2"
          >
            <ArrowRight className="h-5 w-5" />
            <span className="font-medium">Export List</span>
          </Button>
        </motion.div>
        
        {/* Shopping List by Category */}
        <div className="space-y-6">
          {sortedCategories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div className={`py-3 px-5 border-b ${categoryColors[category as keyof typeof categoryColors]}`}>
                <h2 className="font-montserrat font-semibold">{category}</h2>
              </div>
              <div className="divide-y">
                {shoppingList[category].map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
                    className="p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        id={`item-${item.id}`}
                        checked={item.checked}
                        onCheckedChange={() => toggleItem(category, item.id)}
                        className="h-5 w-5 rounded border-2 data-[state=checked]:bg-chef-bright-orange data-[state=checked]:border-chef-bright-orange"
                      />
                      <label 
                        htmlFor={`item-${item.id}`}
                        className={`font-roboto text-lg cursor-pointer ${
                          item.checked ? 'line-through text-gray-400' : ''
                        }`}
                      >
                        {item.name}
                      </label>
                    </div>
                    <span className={`text-sm ${item.checked ? 'text-gray-400' : 'text-gray-500'}`}>
                      {item.quantity} {item.unit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListPage;
