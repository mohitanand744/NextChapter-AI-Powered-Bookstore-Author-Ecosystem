import React, { createContext, useContext, useState, useCallback } from "react";
import ComingSoonModal from "../../components/Modal/ComingSoonModal";

const ComingSoonContext = createContext(null);

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error("useComingSoon must be used within a ComingSoonProvider");
  }
  return context;
};

export const ComingSoonProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    exploreLink: null,
    onExplore: null,
    message: null,
  });

  const openComingSoon = useCallback(({ exploreLink, onExplore, message } = {}) => {
    setModalConfig({ exploreLink, onExplore, message });
    setIsOpen(true);
  }, []);

  const closeComingSoon = useCallback(() => {
    setIsOpen(false);
    // Optional: reset config after close animation finishes
    // setTimeout(() => setModalConfig({ exploreLink: null, onExplore: null, message: null }), 300);
  }, []);

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, closeComingSoon, isOpen }}>
      {children}
      <ComingSoonModal
        isOpen={isOpen}
        onClose={closeComingSoon}
        exploreLink={modalConfig.exploreLink}
        onExplore={modalConfig.onExplore}
        message={modalConfig.message}
      />
    </ComingSoonContext.Provider>
  );
};
