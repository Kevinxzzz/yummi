import { motion } from "framer-motion";
import { Recipe } from "@/types/recipe";

export const IngredientsCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Ingredientes</h2>

        <ul className="space-y-3">
          {recipe.ingredients[0].ingredients.map((text, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-3 text-foreground"
            >
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{text}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
};
