import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const LinkSingUp = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-6 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Não tem uma conta?{" "}
          <Link
            to="/signUp"
            className="text-primary font-medium hover:underline transition-all"
          >
            Criar conta
          </Link>
        </p>
      </motion.div>
    </>
  );
};
