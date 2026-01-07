import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Recipe } from "@/types/recipe";

export const ReviewsCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Avaliações</h2>
        <div className="space-y-4">
          {recipe.reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-muted/30 rounded-lg p-4 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-foreground">
                  {/* {review.userName} */}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString("pt-BR")}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};
