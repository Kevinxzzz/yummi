import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { loginUser } from "@/service/userService";
import { HeaderLoginPage } from "@/components/LoginPage/HeaderLoginPage";
import { FormLoginPage } from "@/components/LoginPage/FormLoginPage";
import { LinkSingUp } from "@/components/LoginPage/LInkSingUp";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    try {
      const resLogin = await loginUser({ email, password });
      localStorage.setItem("token", resLogin.token);
      localStorage.setItem("user", JSON.stringify(resLogin.user));
    } catch (error) {
      console.error("error when searching for user", error);

      return toast({
        title: "Erro tentar fazer login",
        description: "Usuário não encontrado ou senha ou email incorreto.",
        variant: "destructive",
      });
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login realizado com sucesso!",
        description: "Bem-vindo de volta ao Yummi.",
      });
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/30 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-card rounded-3xl shadow-xl p-8 border border-border/50">
          <HeaderLoginPage />

          <FormLoginPage
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
            password={password}
            showPassword={showPassword}
            setPassword={setPassword}
            setShowPassword={setShowPassword}
            isLoading={isLoading}
          />

          <LinkSingUp />
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
