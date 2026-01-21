import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UtensilsCrossed, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SideBarType } from "@/types/sideBar";


export const Header = ({open, setOpen}: SideBarType) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const userId = user?.id;

  const clickButtonSideBar=() =>{
    setOpen(true);
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border shadow-soft"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/"
          onClick={() => navigate("/", { replace: true })}
          className="flex items-center gap-2 group"
        >
          <motion.div
            whileHover={{ rotate: 15 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <UtensilsCrossed className="w-5 h-5 text-primary text-xl sm:w-7 h-7 md:w-8 h-8" />
          </motion.div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-smooth">
            Yummi <span className="text-xl sm:text-2xl md:text-3xl">🍰</span>
          </h1>
        </Link>

        <nav className="flex items-center sm:gap-6 gap-4 text-xs sm:text-base ">
          <Link
            to="/about"
            className="text-foreground hover:text-primary transition-smooth font-medium"
          >
            Sobre
          </Link>

          {!userId ? (
            <Link to="/login">
              <button
                className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-gray-700 
         transition-colors duration-500 hover:bg-[#FFD3C2] hover:text-gray-900"
              >
                Entrar
              </button>
            </Link>
          ) : (
            <>
              <Button
                onClick={clickButtonSideBar}
                variant="outline"
                size="icon"
                className="rounded-full"
              >
                <User className="h-5 w-5" />
              </Button>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
