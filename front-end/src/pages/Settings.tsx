import { useState } from "react";
import { Bell, Palette, Globe, HelpCircle, Moon, Sun } from "lucide-react";
import { ModalLanguage } from "@/components/SettingsPage/Modals";
import { useTheme } from "@/contexts/Theme";
import { HeaderSettingsPage } from "@/components/SettingsPage/HeaderSettingsPage";
import { MainSettingsPage } from "@/components/SettingsPage/MainSettingsPage";

const Settings = () => {
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState<boolean>(false);

  const settingsSections = [
    {
      title: "Preferências",
      items: [
        {
          icon: darkMode ? Moon : Sun,
          label: "Modo Escuro",
          action: "toggle",
          value: darkMode,
          onChange: toggleTheme,
        },
        {
          icon: Bell,
          label: "Notificações Push",
          action: "toggle",
          value: notifications,
          onChange: setNotifications,
        },
        {
          icon: Bell,
          label: "Notificações por Email",
          action: "toggle",
          value: emailNotifications,
          onChange: setEmailNotifications,
        },
        {
          icon: Globe,
          label: "Idioma",
          subtitle: "Português (BR)",
          action: "openModal",
          value: languageModalOpen,
          onChange: () => setLanguageModalOpen(true),
        },
      ],
    },
    {
      title: "Sobre",
      items: [
        { icon: HelpCircle, label: "Ajuda e Suporte", action: "navigate" },
        { icon: Palette, label: "Sobre o Yummi", action: "navigate" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <HeaderSettingsPage />

      <MainSettingsPage settingsSections={settingsSections} />

      <ModalLanguage
        languageModalOpen={languageModalOpen}
        setLanguageModalOpen={setLanguageModalOpen}
      />
    </div>
  );
};

export default Settings;
