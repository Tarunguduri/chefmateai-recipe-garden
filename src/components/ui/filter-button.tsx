
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FilterButtonProps {
  children: ReactNode;
  active: boolean;
  color?: string;
  onClick: () => void;
}

const FilterButton = ({ 
  children, 
  active, 
  color = "bg-chef-bright-orange",
  onClick 
}: FilterButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 font-montserrat",
        active 
          ? `${color} text-white shadow-md`
          : "bg-white text-gray-700 hover:bg-gray-100"
      )}
    >
      {children}
    </motion.button>
  );
};

export default FilterButton;
