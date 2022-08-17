// this is fucking pdfviewer

import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function PdfViewer({ docUrl }) {
  // const { data, isLoading } = useQuery("pdf", documents.download);

  const [numPages, setNumPages] = useState(null);

  const onDocumentLoadSuccess = (pdf) => {
    const { numPages: nextNumPages } = pdf;
    console.log(pdf);
    setNumPages(nextNumPages);
  };

  const onLoadSuccess = ({ width, height, originalWidth, originalHeight }) => {
    console.log({ width, height, originalHeight, originalWidth });
  };

  return (
    <>
      <Document
        file={`data:application/pdf;base64,${docUrl}`}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          onLoadSuccess={onLoadSuccess}
          renderTextLayer={false}
          scale={1}
          key={1}
          pageNumber={1}
        />
      </Document>
    </>
  );
}

export default PdfViewer;
