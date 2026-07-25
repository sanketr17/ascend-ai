import React from "react";
import { ExtendedUserProfile } from "../../types/settingsTypes";
import { ProfileCard } from "./ProfileCard";
import { PageTransition } from "../DesignSystem";

interface ProfileViewProps {
  profile: ExtendedUserProfile;
  onEditProfileClick: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ profile, onEditProfileClick }) => {
  return (
    <PageTransition className="space-y-8">
      <ProfileCard profile={profile} onEditClick={onEditProfileClick} />
    </PageTransition>
  );
};
