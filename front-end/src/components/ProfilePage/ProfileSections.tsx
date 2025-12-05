import { motion } from "framer-motion";

interface MainProfilePageProps {
  profileSections: Array<{
    title: string;
    items: Array<{
      icon: React.ComponentType<any>;
      label: string;
      action: string;
    }>;
  }>;
}
export const ProfileSections = ({ profileSections }: MainProfilePageProps) => {
  return (
    <>
      {profileSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sectionIndex * 0.1 }}
          className="bg-card text-base backdrop-blur-md rounded-3xl shadow-sm overflow-hidden"
        >
          <h3 className="px-6 pt-5 pb-2 text-sm font-semibold text-base uppercase tracking-wide">
            {section.title}
          </h3>
          <div className="px-2 pb-2">
            {section.items.map((item, itemIndex) => (
              <div key={item.label}>
                <button
                  className="w-full px-4 py-4 flex items-center gap-4 hover:bg-secondary rounded-2xl transition-colors"
                  // onClick={() => {
                  //   if (item.action === "toggle" && item.onChange) {
                  //     item.onChange(!item.value);
                  //   }
                  // }}
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-base">{item.label}</p>
                    {/* {item.subtitle && (
                        <p className="text-sm text-gray-500">{item.subtitle}</p>
                      )} */}
                  </div>
                  {/* {item.action === "toggle" ? (
                      <Switch 
                        checked={item.value} 
                        onCheckedChange={item.onChange}
                        className="data-[state=checked]:bg-orange-500"
                      />
                    ) : (
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    )} */}
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </>
  );
};
