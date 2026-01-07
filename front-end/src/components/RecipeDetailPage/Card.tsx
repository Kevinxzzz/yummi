import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { Recipe } from "@/types/recipe";
import { HeaderCard } from "./HeaderCard";
import { IngredientsCard } from "./IngredientsCard";
import { PreparationMethodCard } from "./PreparationMethodCard";
import { ReviewsCard } from "./ReviewsCard";

interface CardProps {
  recipe: Recipe;
  averageRating: number;
}
export const Card = ({ recipe, averageRating }: CardProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card rounded-[1rem] shadow-card p-8 space-y-8"
      >
        <HeaderCard recipe={recipe} averageRating={averageRating} />

        <Separator />

        <IngredientsCard recipe={recipe} />

        <Separator />

        <PreparationMethodCard recipe={recipe} />

        {recipe.reviews.length > 0 && (
          <>
            <Separator />
            <ReviewsCard recipe={recipe} />
          </>
        )}
      </motion.div>
    </>
  );
};
