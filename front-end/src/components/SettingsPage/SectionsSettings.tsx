import { motion } from "framer-motion";
import { ChevronRight, UserX } from "lucide-react";
import { Switch } from "@/components/ui/switch";

export const SectionsSettings = ({ section, sectionIndex }) => {
  return (
    <>
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
    </>
  );
};
