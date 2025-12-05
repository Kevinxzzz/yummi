import { User, Lock } from "lucide-react";
import { HeaderProfilePage } from "@/components/ProfilePage/HeaderProfilePage";
import { MainProfilePage } from "@/components/ProfilePage/MainProfilePage";
import { getUser } from "@/service/userService";
import { useEffect, useState } from "react";
import type { UserType } from "@/types/user";
const Profile = () => {
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userLocalStorage = JSON.parse(localStorage.getItem("user"));
        const userId = userLocalStorage?.id;
        if (!userId) return;

        const userData = await getUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };
    fetchUser();
  }, []);

  const profileSections = [
    {
      title: "Conta",
      items: [
        { icon: User, label: "Editar Perfil", action: "navigate" },
        { icon: Lock, label: "Alterar Senha", action: "navigate" },
      ],
    },
  ];
  return (
    <div className="min-h-screen bg-background">
      <HeaderProfilePage />
      <MainProfilePage user={user} profileSections={profileSections} />
    </div>
  );
};

export default Profile;
