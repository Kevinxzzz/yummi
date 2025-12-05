import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  Palette,
  Globe,
  HelpCircle,
  ChevronRight,
  Moon,
  Sun,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { ModalLanguage } from "@/components/SettingsPage/Modals";
import { useTheme } from "@/contexts/Theme";

const Settings = () => {
  const Navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState<boolean>(false);
  const goBack = () => {
    Navigate(-1);
  };

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
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md ">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button
            onClick={() => goBack()}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5 text-orange-600" />
          </Button>
          <h1 className="text-xl font-bold">Configurações</h1>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Settings Sections */}
        {settingsSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
            className="bg-card text-base backdrop-blur-md rounded-3xl shadow-sm border  overflow-hidden"
          >
            <h3 className="px-6 pt-5 pb-2 text-base font-semibold  uppercase tracking-wide">
              {section.title}
            </h3>
            <div className="px-2 pb-2">
              {section.items.map((item, itemIndex) => (
                <div key={item.label}>
                  <button
                    className="w-full px-4 py-4 flex items-center gap-4 hover:bg-secondary rounded-2xl transition-colors"
                    onClick={() => {
                      if (item.action === "toggle" && item.onChange) {
                        item.onChange(!item.value);
                      }
                      if (item.action === "openModal") {
                        item.onChange(!item.value);
                      }
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium text-base">{item.label}</p>
                      {item.subtitle && (
                        <p className="text-sm text-base">{item.subtitle}</p>
                      )}
                    </div>
                    {item.action === "toggle" ? (
                      <Switch
                        checked={item.value}
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-orange-500"
                      />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-base" />
                    )}
                  </button>
                  
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Logout Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl bg-primary border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <UserX className="h-5 w-5 mr-2" />
            Excluir conta
          </Button>
        </motion.div>

        {/* App Version */}
        <p className="text-center text-sm text-base pb-6">Yummi v1.0.0</p>
      </main>

      <ModalLanguage
        languageModalOpen={languageModalOpen}
        setLanguageModalOpen={setLanguageModalOpen}
      />
    </div>
  );
};

export default Settings;
