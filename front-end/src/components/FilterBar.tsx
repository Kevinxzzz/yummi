import { motion } from "framer-motion";
import { RecipeType, recipeTypeLabels } from "@/types/recipe";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  selectedType: RecipeType | "all";
  onTypeChange: (type: RecipeType | "all") => void;
}

export const FilterBar = ({ selectedType, onTypeChange }: FilterBarProps) => {
  const types: (RecipeType | "all")[] = [
    "all",
    "sobremesa",
    "pratoprincipal",
    "entrada",
    "salada",
    "sopa",
    "cafedamanha",
    "lanche",
    "bebida",
  ];

  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <span className="text-sm font-medium text-muted-foreground">
        Filtrar por:
      </span>
      <div className="flex flex-wrap gap-2">
        {types.map((type) => {
          const isSelected = selectedType === type;
          const label = type === "all" ? "Todos" : recipeTypeLabels[type];

          return (
            <motion.div
              key={type}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={isSelected ? "default" : "outline"}
                size="sm"
                onClick={() => onTypeChange(type)}
                className={`rounded-full transition-smooth ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card hover:bg-primary/10"
                }`}
              >
                {label}
                {/* {isSelected && type !== "all" && <X className="w-3 h-3 ml-1" />} */}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
