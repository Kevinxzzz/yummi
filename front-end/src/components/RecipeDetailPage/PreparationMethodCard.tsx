import { motion } from "framer-motion";
import { Recipe } from "@/types/recipe";
export const PreparationMethodCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Modo de Preparo</h2>

        <ol className="space-y-4">
          {recipe.preparationMethods[0].steps.map((text, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex gap-4"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                {index + 1}
              </span>

              <p className="text-foreground pt-1">{text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </>
  );
};
