"use client";

import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


interface ResumeViewerProps {
  pdfUrl: string; 
}

export default function ResumeViewer({ pdfUrl }: ResumeViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pdfWidth, setPdfWidth] = useState(950);
  const [minHeight, setMinHeight] = useState(900);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 900) {
        setPdfWidth(350);
        setMinHeight(455);
      } else {
        setPdfWidth(950);
        setMinHeight(900);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div
      className="flex justify-center overflow-auto border rounded-lg bg-gray-100 dark:bg-gray-800 p-2"
      style={{ minHeight }}
    >
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        loading={<div/>}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={pdfWidth}
          />
        ))}
      </Document>
    </div>
  );
}