import { ProfileCard } from "./ProfileCard";
import { ProfileSections } from "./ProfileSections";
import type { UserType } from "@/types/user";
type MainProfilePageProps = {
  user: UserType | null;
};

export const MainProfilePage = ({
  profileSections,
  user,
}: MainProfilePageProps & { profileSections: any }) => {
  return (
    <>
      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <ProfileCard user={user} />
        <ProfileSections profileSections={profileSections} />
      </main>
    </>
  );
};
