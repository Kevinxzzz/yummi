import { motion } from "framer-motion";
import { UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionsSettings } from "./SectionsSettings";

export const MainSettingsPage = ({
  settingsSections,
}: {
  settingsSections: any[];
}) => {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {settingsSections.map((section, sectionIndex) => (
          <SectionsSettings section={section} sectionIndex={sectionIndex} />
        ))}

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
        <p className="text-center text-sm text-base pb-6">Yummi v1.0.0</p>
      </main>
    </>
  );
};
