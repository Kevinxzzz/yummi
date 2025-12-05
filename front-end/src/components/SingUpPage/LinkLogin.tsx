import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export const LinkLogin = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Já tem conta?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline transition-all"
          >
            Fazer login
          </Link>
        </p>
      </motion.div>
    </>
  );
};
