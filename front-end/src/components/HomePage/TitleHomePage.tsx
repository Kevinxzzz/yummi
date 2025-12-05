import { motion } from "framer-motion";
export const TitleHomePage = () => {
  return (
    <>
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-foreground"
      >
        Descubra Receitas <span className="text-primary">Deliciosas</span>
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        Explore nossa coleção de receitas saborosas e fáceis de fazer
      </motion.p>
    </>
  );
};
