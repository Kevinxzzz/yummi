import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { postUser } from "@/service/userService";
import { Eye, EyeOff } from "lucide-react";
import { HeaderSingUpPage } from "@/components/SingUpPage/HeaderSingUpPage";

interface FormSingUpPageProps {
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  userName: string;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showconfirmPassword: boolean;
  setShowConfirmPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormSingUpPage = ({
  handleSubmit,
  isLoading,
  name,
  setName,
  userName,
  setUserName,
  email,
  setEmail,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) => {
  return (
    <>
      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            Nome
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="Seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="name" className="text-foreground font-medium">
            UserName
          </Label>
          <Input
            id="userName"
            type="text"
            placeholder="nome de identificação"
            value={userName}
            onChange={(e) => setUserName(e.target.value.toLowerCase())}
            className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-foreground font-medium">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-foreground font-medium">
            Senha
          </Label>
          <Input
            id="password"
            type={!showPassword ? "password" : "text"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
            disabled={isLoading}
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
          <p className="text-xs text-muted-foreground">
            Mínimo de 6 caracteres
          </p>
        </div>

        <div className="space-y-2 relative">
          <Label htmlFor="password" className="text-foreground font-medium">
            Confirmar Senha
          </Label>
          <Input
            id="ConfirmPassword"
            type={!showConfirmPassword ? "password" : "text"}
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 rounded-2xl border-border/50 focus:border-primary transition-all"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-0.5 text-muted-foreground hover:text-foreground"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button
          type="submit"
          className="w-full font-semibold"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Cadastrar"}
        </Button>
      </motion.form>
    </>
  );
};
