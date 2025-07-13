"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ResumeContextType {
  pdfUrl: string;
}

const ResumeContext = createContext<ResumeContextType>({ pdfUrl: "" });

export function useResume() {
  return useContext(ResumeContext);
}

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [pdfUrl, setPdfUrl] = useState<string>("");

  useEffect(() => {
    async function fetchResume() {
      try {
        const res = await fetch("/api/resume");
        if (res.ok) {
          const blob = await res.blob();
          setPdfUrl(URL.createObjectURL(blob));
        } else {
          setPdfUrl("/Dev_Chawla_Resume.pdf");
        }
      } catch {
        setPdfUrl("/Dev_Chawla_Resume.pdf");
      }
    }
    fetchResume();
  }, []);

  return (
    <ResumeContext.Provider value={{ pdfUrl }}>
      {children}
    </ResumeContext.Provider>
  );
}
