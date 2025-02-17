'use client';

import React, { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { ProgressBar } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { X, Download, Search, ChevronLeft } from 'lucide-react';

interface PDFViewerProps {
  url: string;
  title?: string;
  onClose: () => void;
  onDownload: () => void;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ url, title = "Document.pdf", onClose, onDownload }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);

  return (
    <div className="w-full flex flex-col bg-color1 mt-4 mb-2 border-2 border-color4 rounded-lg">
      {/* Top toolbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-color1">
        <div className="flex items-center gap-4">
          <button className="hover:bg-color3 p-2 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-sm text-gray-700">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="hover:bg-color3 p-2 rounded-full"
            onClick={onDownload}
          >
            <Download className="w-5 h-5" />
          </button>
          <button className="hover:bg-color3 p-2 rounded-full">
            <Search className="w-5 h-5" />
          </button>
          <button
            className="hover:bg-color3 p-2 rounded-full"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 flex flex-col bg-color3 overflow-hidden">
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          <div className="w-full h-[calc(100vh-80px)] overflow-auto flex justify-center">
            <Viewer
              fileUrl={url}
              defaultScale={SpecialZoomLevel.PageWidth}
              onDocumentLoad={(e) => setTotalPages(e.doc.numPages)}
              onPageChange={(e) => setCurrentPage(e.currentPage)}
              renderLoader={(percentages) => (
                <div className="flex justify-center items-center h-full">
                  <div className="w-64">
                    <ProgressBar progress={Math.round(percentages)} />
                  </div>
                </div>
              )}
              plugins={[]}
            />
          </div>
        </Worker>
      </div>


    </div>
  );
};

export default PDFViewer;