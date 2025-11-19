import React, { useState, useRef } from 'react';
import { Upload, FileText, Copy, Check, Download, AlertCircle } from 'lucide-react';

const TranscriptCleaner = () => {
  // State variables
  const [isDragging, setIsDragging] = useState(false);
  const [originalFileName, setOriginalFileName] = useState('');
  const [cleanedTranscript, setCleanedTranscript] = useState('');
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  
  const fileInputRef = useRef(null);

  /**
   * Apply all 6 transcript cleaning rules while preserving structure
   * Rules:
   * 1. Capitalize "veteran" and "veterans"
   * 2. Capitalize "vet" and "vets"
   * 3. Capitalize "secretary of veterans affairs"
   * 4. Capitalize "VA secretary"
   * 5. Replace "V.A." with "VA"
   * 6. Capitalize "department of veterans affairs"
   */
  const applyTranscriptRules = (text) => {
    // Regex to identify timestamp lines (format: 00;00;00;08 - 00;00;31;08)
    const timestampRegex = /^\d{2};\d{2};\d{2};\d{2}\s*-\s*\d{2};\d{2};\d{2};\d{2}$/;
    
    // Split text into lines
    const lines = text.split('\n');
    
    // Process each line
    const cleanedLines = lines.map((line) => {
      // Preserve empty lines
      if (line.trim() === '') {
        return line;
      }
      
      // Preserve timestamp lines exactly as-is
      if (timestampRegex.test(line.trim())) {
        return line;
      }
      
      // Preserve speaker names (single words on their own line, typically short)
      // Speaker names are usually single words like "Unknown", "Speaker", etc.
      const trimmedLine = line.trim();
      if (trimmedLine.split(/\s+/).length === 1 && trimmedLine.length < 30 && !trimmedLine.includes('.')) {
        return line;
      }
      
      // Apply text correction rules to dialogue lines
      let cleanedLine = line;
      
      // Rule 5: Replace "V.A." with "VA" (do this first to avoid conflicts)
      cleanedLine = cleanedLine.replace(/V\.A\./gi, 'VA');
      
      // Rule 3: Capitalize "secretary of veterans affairs"
      cleanedLine = cleanedLine.replace(/\bsecretary\s+of\s+veterans\s+affairs\b/gi, 'Secretary of Veterans Affairs');
      
      // Rule 6: Capitalize "department of veterans affairs"
      cleanedLine = cleanedLine.replace(/\bdepartment\s+of\s+veterans\s+affairs\b/gi, 'Department of Veterans Affairs');
      
      // Rule 4: Capitalize "VA secretary" (handle both "VA" and "va")
      cleanedLine = cleanedLine.replace(/\b(va|VA)\s+secretary\b/gi, 'VA Secretary');
      
      // Rule 1: Capitalize "veteran" and "veterans"
      cleanedLine = cleanedLine.replace(/\bveteran\b/g, 'Veteran');
      cleanedLine = cleanedLine.replace(/\bveterans\b/g, 'Veterans');
      
      // Rule 2: Capitalize "vet" and "vets" (but not as part of other words like "veterinary")
      cleanedLine = cleanedLine.replace(/\bvet\b/g, 'Vet');
      cleanedLine = cleanedLine.replace(/\bvets\b/g, 'Vets');
      
      return cleanedLine;
    });
    
    // Join lines back together
    return cleanedLines.join('\n');
  };

  /**
   * Process uploaded file
   */
  const processFile = (file) => {
    // Validate file type
    if (!file.name.endsWith('.txt')) {
      setError('Please upload a .txt file');
      return;
    }
    
    setError('');
    setIsProcessing(true);
    setOriginalFileName(file.name);
    
    // Read file content
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target.result;
      const cleaned = applyTranscriptRules(content);
      setCleanedTranscript(cleaned);
      setIsProcessing(false);
    };
    
    reader.onerror = () => {
      setError('Error reading file. Please try again.');
      setIsProcessing(false);
    };
    
    reader.readAsText(file);
  };

  /**
   * Handle file upload via button
   */
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  /**
   * Handle drag over event
   */
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  /**
   * Handle drag leave event
   */
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  /**
   * Handle file drop
   */
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  /**
   * Copy cleaned transcript to clipboard
   */
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(cleanedTranscript);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  /**
   * Download cleaned transcript as .txt file
   */
  const downloadCleanedFile = () => {
    // Create blob with cleaned content
    const blob = new Blob([cleanedTranscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    
    // Generate filename: original-name-cleaned.txt
    const baseName = originalFileName.replace(/\.txt$/, '');
    a.download = `${baseName}-cleaned.txt`;
    
    // Trigger download
    document.body.appendChild(a);
    a.click();
    
    // Cleanup
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /**
   * Reset to upload new file
   */
  const resetApp = () => {
    setCleanedTranscript('');
    setOriginalFileName('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Header Section */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Transcript Cleaner
        </h1>
        <p className="text-gray-600">
          Clean Adobe Premiere transcript files by applying VA-specific capitalization rules
        </p>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {!cleanedTranscript ? (
          /* Upload Area - shown when no file processed */
          <>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Drop your transcript file here
              </h3>
              <p className="text-gray-600 mb-4">or</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Choose File'}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Only .txt files are supported
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Rules Summary Box */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                Applied Rules:
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li>✓ Capitalize "veteran" and "veterans"</li>
                <li>✓ Capitalize "vet" and "vets"</li>
                <li>✓ Capitalize "Secretary of Veterans Affairs"</li>
                <li>✓ Capitalize "VA Secretary"</li>
                <li>✓ Replace "V.A." with "VA"</li>
                <li>✓ Capitalize "Department of Veterans Affairs"</li>
              </ul>
              <p className="text-xs text-blue-700 mt-4">
                All timestamps, speaker names, and line breaks are preserved exactly as-is.
              </p>
            </div>
          </>
        ) : (
          /* Results Section - shown after processing */
          <>
            {/* File name display */}
            <div className="flex items-center mb-4 pb-4 border-b border-gray-200">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <span className="text-gray-700 font-medium">{originalFileName}</span>
              <span className="ml-2 text-sm text-green-600">✓ Cleaned</span>
            </div>

            {/* Button Group */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    Copy to Clipboard
                  </>
                )}
              </button>
              <button
                onClick={downloadCleanedFile}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
              <button
                onClick={resetApp}
                className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-auto"
              >
                Process Another File
              </button>
            </div>

            {/* Scrollable Transcript Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-h-[600px] overflow-y-auto">
              <pre className="text-sm font-mono whitespace-pre-wrap text-gray-800">
                {cleanedTranscript}
              </pre>
            </div>

            {/* Applied Rules Summary */}
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                ✓ All capitalization rules applied successfully. Timestamps and speaker names preserved.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 text-center text-sm text-gray-600">
        <p>Department of Veterans Affairs • Transcript Cleaner Tool</p>
      </div>
    </div>
  );
};

export default TranscriptCleaner;
