import WindowControls from "#components/WindowControls.jsx";
import { Download, ZoomIn, ZoomOut, Loader2 } from "lucide-react";
import windowWrapper from "../hoc/WindowWrapper.jsx";
import React, { useRef, useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  const containerRef = useRef(null);
  const [pageWidth, setPageWidth] = useState(undefined);
  const [scale, setScale] = useState(2);

  const measureWidth = useCallback(() => {
    if (containerRef.current && window.matchMedia('(max-width: 639px)').matches) {
      setPageWidth(containerRef.current.clientWidth);
    } else {
      setPageWidth(500);
    }
  }, []);

  const handleZoomIn = () => setScale((s) => Math.min(3, s + 0.25));
  const handleZoomOut = () => setScale((s) => Math.max(0.5, s - 0.25));

  useEffect(() => {
    const handleResize = () => {
      measureWidth();
      setScale(2); // Reset zoom when crossing device boundaries or resizing
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [measureWidth]);

  return (
    <>
      <div id="window-header" className="relative z-50">
        <WindowControls target="resume" />
        <h2>Resume.pdf</h2>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleZoomOut}
            className="cursor-pointer border-none bg-transparent flex items-center justify-center disabled:opacity-50"
            title="Zoom out"
            disabled={scale <= 0.5}
          >
            <ZoomOut className="icon w-6 h-6 text-gray-600" />
          </button>
          <span className="text-sm font-mono w-12 text-center pointer-events-none text-gray-600">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={handleZoomIn}
            className="cursor-pointer border-none bg-transparent flex items-center justify-center disabled:opacity-50"
            title="Zoom in"
            disabled={scale >= 3}
          >
            <ZoomIn className="icon w-6 h-6 text-gray-600" />
          </button>
          
          <div className="w-[1px] h-5 bg-gray-300 mx-1"></div>

          <a
            href="files/sagar_prasad_resume.pdf"
            download
            className="cursor-pointer flex items-center justify-center"
            title="Download resume"
          >
            <Download className="icon w-6 h-6 text-gray-600" />
          </a>
        </div>
      </div>

      <div ref={containerRef} className="resume-content overflow-x-auto relative z-0">
        <div className="w-fit mx-auto min-h-[500px]">
          <Document 
            file="files/sagar_prasad_resume.pdf" 
            onLoadSuccess={measureWidth}
            loading={
              <div className="flex items-center justify-center h-[500px] w-full min-w-[300px]">
                <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
              </div>
            }
          >
            <Page 
              pageNumber={1} 
              width={pageWidth} 
              scale={scale} 
              renderTextLayer 
              renderAnnotationLayer 
              loading={
                <div className="flex items-center justify-center h-[500px] w-full min-w-[300px]">
                  <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                </div>
              }
            />
          </Document>
        </div>
      </div>
    </>
  );
};

const ResumeWindow = windowWrapper(Resume, "resume");

export default ResumeWindow;
