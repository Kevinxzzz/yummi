import { motion } from "framer-motion";

export const HeaderLoginPage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="text-4xl">🍰</span>
          <h1 className="text-3xl font-bold text-foreground">Yummi</h1>
        </div>
        <p className="text-muted-foreground">
          Entre e descubra receitas deliciosas
        </p>
      </motion.div>
    </>
  );
};
