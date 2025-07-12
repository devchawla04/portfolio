"use client";

import dynamic from "next/dynamic";

const ResumeViewer = dynamic(() => import("./ResumeViewer"), { ssr: false });

const pdfUrl = "/Dev_Chawla.pdf";

export default function ResumePage() {
  return (
    <section className="py-20 min-h-screen flex flex-col items-center bg-gray-50 dark:bg-gray-900 mt-[-33px]">
      <div
        className="w-full max-w-5xl bg-white dark:bg-dark rounded-lg shadow-lg p-6 min-h-[900px]"
        style={{ minHeight: 900 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Resume</h1>
          <a
            href={pdfUrl}
            download
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
          >
            Download PDF
          </a>
        </div>
        <ResumeViewer />
      </div>
    </section>
  );
}