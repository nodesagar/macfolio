import WindowControls from "#components/WindowControls.jsx";
import { Download } from "lucide-react";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import React, { useRef, useState, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const Resume = () => {
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(undefined);

  const measureWidth = useCallback(() => {
    if (containerRef.current && window.matchMedia('(max-width: 639px)').matches) {
      setPageWidth(containerRef.current.clientWidth);
    } else {
      setPageWidth(500);
    }
  }, []);

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <a
          href="files/sagar_prasad_resume.pdf"
          download
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <div ref={containerRef} className="resume-content">
        <Document file="files/sagar_prasad_resume.pdf" onLoadSuccess={measureWidth}>
          <Page pageNumber={1} width={pageWidth} renderTextLayer renderAnnotationLayer />
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");

export default ResumeWindow;
