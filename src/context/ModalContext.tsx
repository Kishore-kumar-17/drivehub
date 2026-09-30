"use client";

import React, { createContext, useContext, useState } from "react";
import { Car } from "@/lib/types";

interface ModalContextType {
  isTestDriveOpen: boolean;
  selectedCarForTestDrive: Car | null;
  openTestDriveModal: (car?: Car | null) => void;
  closeTestDriveModal: () => void;
  isEnquiryOpen: boolean;
  selectedCarForEnquiry: Car | null;
  openEnquiryModal: (car?: Car | null) => void;
  closeEnquiryModal: () => void;
}

const ModalContext = createContext<ModalContextType>({
  isTestDriveOpen: false,
  selectedCarForTestDrive: null,
  openTestDriveModal: () => {},
  closeTestDriveModal: () => {},
  isEnquiryOpen: false,
  selectedCarForEnquiry: null,
  openEnquiryModal: () => {},
  closeEnquiryModal: () => {},
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [selectedCarForTestDrive, setSelectedCarForTestDrive] = useState<Car | null>(null);

  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedCarForEnquiry, setSelectedCarForEnquiry] = useState<Car | null>(null);

  const openTestDriveModal = (car?: Car | null) => {
    setSelectedCarForTestDrive(car || null);
    setIsTestDriveOpen(true);
  };

  const closeTestDriveModal = () => {
    setIsTestDriveOpen(false);
    setSelectedCarForTestDrive(null);
  };

  const openEnquiryModal = (car?: Car | null) => {
    setSelectedCarForEnquiry(car || null);
    setIsEnquiryOpen(true);
  };

  const closeEnquiryModal = () => {
    setIsEnquiryOpen(false);
    setSelectedCarForEnquiry(null);
  };

  return (
    <ModalContext.Provider
      value={{
        isTestDriveOpen,
        selectedCarForTestDrive,
        openTestDriveModal,
        closeTestDriveModal,
        isEnquiryOpen,
        selectedCarForEnquiry,
        openEnquiryModal,
        closeEnquiryModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModals() {
  return useContext(ModalContext);
}
