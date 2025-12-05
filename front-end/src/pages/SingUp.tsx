import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import { postUser } from "@/service/userService";
import { HeaderSingUpPage } from "@/components/SingUpPage/HeaderSingUpPage";
import { FormSingUpPage } from "@/components/SingUpPage/FormSingUpPage";
import { LinkLogin } from "@/components/SingUpPage/LinkLogin";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    if (userName.split(" ").length > 1) {
      toast({
        title: "UserName contém espaços",
        description: "por favor, faça um userName sem espaços.",
        variant: "destructive",
      });
      return;
    }

    if (!email.includes("@") || email.split(" ").length > 1) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "As senhas não coincidem",
        description: "Confirme a senha corretamente ou corrija a senha.",
        variant: "destructive",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: "Senha muito curta",
        description: "A senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    try {
      await postUser({ name, userName, email, password });
    } catch (error) {
      console.error("erro to create a new user", error);

      return toast({
        title: "Erro ao criar a conta",
        description: "Usuário já existe ou dados inválidos.",
        variant: "destructive",
      });
    }
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Conta criada com sucesso!",
        description: "Você será redirecionado para o login.",
      });
      setTimeout(() => navigate("/login"), 1500);
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
          <HeaderSingUpPage />
          <FormSingUpPage
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            name={name}
            setName={setName}
            userName={userName}
            setUserName={setUserName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
          />

          <LinkLogin />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUp;
