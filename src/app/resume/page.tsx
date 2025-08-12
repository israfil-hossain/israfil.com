import React from 'react';

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Resume
          </h1>
          <p className="text-lg text-gray-600">
            View my professional resume below or download for offline use
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-6">
          <a
            href="/resume.pdf"
            download="Israfil-Hossain-Resume.pdf"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
          
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors shadow-md"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Open in New Tab
          </a>
        </div>

        {/* PDF Viewer */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="bg-gray-100 px-4 py-3 border-b flex items-center justify-between">
            <p className="text-sm text-gray-600">
              📄 Resume Preview
            </p>
            <span className="text-xs text-gray-500">
              PDF Viewer
            </span>
          </div>
          
          <div className="relative bg-gray-100" style={{ height: '800px' }}>
            <iframe
              src="/resume.pdf#view=FitH"
              className="w-full h-full"
              title="Resume PDF"
              style={{ border: 'none' }}
            />
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Page;
