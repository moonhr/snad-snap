"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

type ViewContextType = {
  onLetterView: boolean;
  setOnLetterView: (value: boolean) => void;
  receivedLetter: boolean;
  setReceivedLetter: (value: boolean) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //편지수신 -> 수신버튼에 전달됨 false가 기본. 소켓이 도착하면 true로 전환.
  const [onLetterView, setOnLetterView] = useState(false);
  //도착한 편지 열람 -> true전환 시 편지 열람창이 활성화.
  const [receivedLetter, setReceivedLetter] = useState(false);

  return (
    <ViewContext.Provider
      value={{
        onLetterView,
        setOnLetterView,
        receivedLetter,
        setReceivedLetter,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within an ViewProvider");
  }
  return context;
};
