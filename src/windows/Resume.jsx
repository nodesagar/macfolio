import WindowControls from '#components/WindowControls.jsx';
import { Download } from 'lucide-react';
import windowWrapper from '../hoc/WindowWrapper.jsx';
import React from 'react'
import { Document, Page, pdfjs } from 'react-pdf';


import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const Resume = () => {
  return (
  
   <>

  <div id="window-header">
    <WindowControls target= "resume" />
    <h2>Resume.pdf</h2>

    <a href="files/resume.pdf"
    download
    className="cursor-pointer" 
    title='Download resume'>
      <Download className='icon' />
    </a>
  </div>

  <Document file="files/resume.pdf">
        <Page
        pageNumber={1} 
        renderTextLayer
        renderAnnotationLayer />
      </Document>
  
  </>
  );
};

const ResumeWindow = windowWrapper(Resume, 'resume');

export default ResumeWindow;
