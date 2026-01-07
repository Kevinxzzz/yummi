import { motion } from "framer-motion";
import { Recipe } from "@/types/recipe";

export const BackGroudImageCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[50vh] min-h-[400px]"
      >
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
      </motion.div>
    </>
  );
};
