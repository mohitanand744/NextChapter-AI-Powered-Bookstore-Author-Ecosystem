import { createContext, useContext, useState } from "react";

const ProfileImageContext = createContext();

export const ProfileImageProvider = ({ children }) => {
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  return (
    <ProfileImageContext.Provider
      value={{ preview, setPreview, isUploading, setIsUploading }}
    >
      {children}
    </ProfileImageContext.Provider>
  );
};

export const useProfileImage = () => useContext(ProfileImageContext);
