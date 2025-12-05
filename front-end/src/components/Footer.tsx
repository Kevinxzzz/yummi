import { motion } from "framer-motion";
import { Instagram, Facebook, Twitter, Heart } from "lucide-react";

export const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-card border-t border-border mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center text-primary transition-smooth"
              >
                <Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 text-muted-foreground text-sm"
          >
            Feito com{" "}
            <Heart className="w-4 h-4 text-destructive fill-destructive" /> por
            Kevin Maravilha.
          </motion.p>

          <p className="text-xs text-muted-foreground">
            © 2025 Yummi. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
