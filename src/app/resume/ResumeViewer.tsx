"use client";

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const dummyPdfUrl = "/Dev_Chawla.pdf";

export default function ResumeViewer() {
  const [numPages, setNumPages] = useState<number | null>(null);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex justify-center overflow-auto border rounded-lg bg-gray-100 dark:bg-gray-800 p-2">
      <Document file={dummyPdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={<div>Loading PDF...</div>}>
        {Array.from(new Array(numPages), (el, index) => (
          <Page
            key={`page_${index + 1}`}
            pageNumber={index + 1}
            width={700}
          />
        ))}
      </Document>
    </div>
  );
} 