# Transcript Cleaner

A React-based web application that processes Adobe Premiere transcript files (.txt format) by applying specific capitalization and text replacement rules for VA-related terminology while preserving the original transcript structure.

## Features

- **Dual Upload Methods**: Upload files via button or drag-and-drop
- **Structure Preservation**: Maintains all timestamps, speaker names, and line breaks
- **Smart Text Processing**: Applies 6 specific capitalization rules to dialogue only
- **Interactive Output**: Copy to clipboard or download cleaned file
- **Clean UI**: Modern, responsive interface with Tailwind CSS

## Applied Rules

The app automatically applies these rules to dialogue text:

1. ✓ Capitalize "veteran" → "Veteran"
2. ✓ Capitalize "veterans" → "Veterans"
3. ✓ Capitalize "vet" → "Vet"
4. ✓ Capitalize "vets" → "Vets"
5. ✓ Capitalize "secretary of veterans affairs" → "Secretary of Veterans Affairs"
6. ✓ Capitalize "VA secretary" → "VA Secretary"
7. ✓ Replace "V.A." → "VA"
8. ✓ Capitalize "department of veterans affairs" → "Department of Veterans Affairs"

**Note**: Timestamps, speaker names, and structural elements are preserved exactly as-is.

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown (typically `http://localhost:5173`)

## Usage

1. **Upload a file**: 
   - Click "Choose File" button, or
   - Drag and drop a .txt file onto the drop zone

2. **Review cleaned transcript**: 
   - View the processed text in the scrollable display
   - All rules are automatically applied

3. **Export your results**:
   - Click "Copy to Clipboard" to copy the cleaned text
   - Click "Download" to save as `[filename]-cleaned.txt`

4. **Process another file**: 
   - Click "Process Another File" to start over

## Example

**Input:**
```
00;00;00;08 - 00;00;31;08
Unknown
The veteran went to the va secretary at the V.A.

00;00;31;09 - 00;00;46;24
Unknown
Many vets use the department of veterans affairs system.
```

**Output:**
```
00;00;00;08 - 00;00;31;08
Unknown
The Veteran went to the VA Secretary at the VA.

00;00;31;09 - 00;00;46;24
Unknown
Many Vets use the Department of Veterans Affairs system.
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Lucide React** - Icons

## Build for Production

```bash
npm run build
```

The production files will be in the `dist` folder.

## Project Structure

```
transcript-cleaner/
├── src/
│   ├── components/
│   │   └── TranscriptCleaner.jsx   # Main component
│   ├── App.jsx                      # App wrapper
│   ├── main.jsx                     # React entry point
│   └── index.css                    # Global styles
├── index.html                       # HTML template
├── package.json                     # Dependencies
├── vite.config.js                   # Vite configuration
└── tailwind.config.js               # Tailwind configuration
```

## Requirements

- Node.js 16+ 
- Modern web browser with clipboard API support

## License

Department of Veterans Affairs

---

**Note**: This tool is designed specifically for Adobe Premiere transcript files with the standard timestamp format (00;00;00;00).
