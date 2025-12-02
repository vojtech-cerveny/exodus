"use client";
import { useEffect, useState } from "react";
import { ShutdownAnnouncementBar } from "./shutdown-announcement-bar";
import { ShutdownLetterModal } from "./shutdown-letter-modal";

export const ShutdownAnnouncement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const localStorageKey = "shutdownLetterAccepted";

  useEffect(() => {
    // Check if user has already accepted the letter
    const hasAccepted = localStorage.getItem(localStorageKey);

    // If not accepted, open the modal automatically on first visit
    if (!hasAccepted) {
      setIsModalOpen(true);
    }
  }, []);

  const handleReadMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ShutdownAnnouncementBar onReadMoreClick={handleReadMoreClick} />
      <ShutdownLetterModal isOpen={isModalOpen} onClose={handleModalClose} />
    </>
  );
};
