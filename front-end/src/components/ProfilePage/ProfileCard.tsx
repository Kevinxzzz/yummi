import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import type { UserType } from "@/types/user";

type MainProfilePageProps = {
  user: UserType | null;
};

export const ProfileCard = ({ user }: MainProfilePageProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card text-base backdrop-blur-md rounded-3xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
            U
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-base">
              {user?.userName || "undefined"}
            </h2>
            <p className="text-sm text-base">{user?.email || "undefined"}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400" />
        </div>
      </motion.div>
    </>
  );
};
