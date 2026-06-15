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
    title: null,
    badge: null,
    features: null,
    logo: null,
    footer: null,
  });

  const openComingSoon = useCallback(({ exploreLink, onExplore, message, title, badge, features, logo, footer } = {}) => {
    setModalConfig({ exploreLink, onExplore, message, title, badge, features, logo, footer });
    setIsOpen(true);
  }, []);

  const closeComingSoon = useCallback(() => {
    setIsOpen(false);
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
        title={modalConfig.title}
        badge={modalConfig.badge}
        features={modalConfig.features}
        logo={modalConfig.logo}
        footer={modalConfig.footer}
      />
    </ComingSoonContext.Provider>
  );
};
