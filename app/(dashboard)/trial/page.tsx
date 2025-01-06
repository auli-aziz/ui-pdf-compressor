"use client";

import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface CompressionData {
  originalSize: string;
  compressedSize: string;
  compressionPercent: string;
}

export default function TrialPage() {
  const [file, setFile] = useState<File | null>(null);
  const [compressedFile, setCompressedFile] = useState<File | null>(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const [compressionData, setCompressionData] = useState<CompressionData | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setCompressionData(null); // Reset compression data when a new file is selected
    }
  };

  const handleCompress = () => {
    if (file) {
      setIsCompressing(true);

      // Simulate compression process
      setTimeout(() => {
        const originalSize = file.size;
        const compressedSize = originalSize * 0.2; // Assume 80% compression
        const compressionPercent = ((originalSize - compressedSize) / originalSize) * 100;

        setCompressedFile(file);
        setCompressionData({
          originalSize: (originalSize / 1024).toFixed(2), // in KB
          compressedSize: (compressedSize / 1024).toFixed(2), // in KB
          compressionPercent: compressionPercent.toFixed(2),
        });
        setIsCompressing(false);
      }, 2000);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Try Our PDF Compression</h1>
        <p className="text-gray-700 text-center mb-8">
          Upload your PDF file below and experience our compression quality before subscribing.
        </p>

        <div className="flex flex-col items-center space-y-4">
          {/* Custom Upload Box */}
          <label
            htmlFor="file-upload"
            className="w-full h-32 flex flex-col justify-center items-center text-gray-600 bg-gray-50 border border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
          >
            {file ? (
              <p className="text-center text-orange-500 font-semibold">
                {file.name} selected
              </p>
            ) : (
              <>
                <svg
                  className="w-12 h-12 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16V6a2 2 0 012-2h6a2 2 0 012 2v10m-3 0a3 3 0 006 0m-6 0a3 3 0 00-6 0m6 4v2m-3-2a3 3 0 01-6 0"
                  ></path>
                </svg>
                <p className="text-gray-500 font-semibold">Click to upload PDF</p>
                <p className="text-gray-400 text-sm">or drag and drop</p>
              </>
            )}
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {/* Compress Button */}
          <Button
            onClick={handleCompress}
            disabled={!file || isCompressing}
            className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-700"
          >
            {isCompressing ? 'Compressing...' : 'Compress PDF'}
          </Button>
        </div>

        {/* Display Result */}
        {compressedFile && !isCompressing && compressionData && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <h2 className="text-lg font-semibold text-green-700">Compression Successful!</h2>
            <p className="text-green-600">Your file has been compressed and is ready for download.</p>
            <p className="mt-4 text-gray-700">
              Original Size: <span className="font-semibold">{compressionData.originalSize} KB</span>
            </p>
            <p className="text-gray-700">
              Compressed Size: <span className="font-semibold">{compressionData.compressedSize} KB</span>
            </p>
            <p className="text-gray-700">
              Compression Percentage: <span className="font-semibold">{compressionData.compressionPercent}%</span>
            </p>
            <Button className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700">
              Download Compressed PDF
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
