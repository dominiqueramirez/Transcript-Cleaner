# Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Open in Browser
Navigate to: **http://localhost:5173/**

---

## Using the App

### Upload a Transcript
**Method 1**: Click the "Choose File" button and select a .txt file

**Method 2**: Drag and drop a .txt file onto the drop zone

### Review & Export
Once processed, you can:
- **Copy to Clipboard**: Click the "Copy to Clipboard" button
- **Download**: Click the "Download" button to save as `[filename]-cleaned.txt`

### Process Another File
Click "Process Another File" to reset and upload a new transcript

---

## Test with Sample File

A sample transcript file is included: `sample-transcript.txt`

Use this to test the app and see how it:
- Capitalizes veteran-related terms
- Preserves timestamps and speaker names
- Maintains all formatting

---

## Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder, ready to deploy.

---

## Troubleshooting

**Port already in use?**
```bash
# Kill the process on port 5173
Get-Process -Id (Get-NetTCPConnection -LocalPort 5173).OwningProcess | Stop-Process
```

**CSS warnings?**
The `@tailwind` CSS warnings are normal and won't affect functionality.

**File not uploading?**
Make sure your file has a `.txt` extension. Other formats are not supported.

---

## Project Structure

```
Transcript Cleaner/
├── src/
│   ├── components/
│   │   └── TranscriptCleaner.jsx   ← Main component
│   ├── App.jsx                      ← Root component
│   ├── main.jsx                     ← Entry point
│   └── index.css                    ← Tailwind styles
├── sample-transcript.txt            ← Test file
├── package.json                     ← Dependencies
└── README.md                        ← Full documentation
```

---

## Support

For issues or questions, refer to:
- **README.md** - Complete documentation
- **TEST-RESULTS.md** - Test coverage details

---

**Department of Veterans Affairs**  
Transcript Cleaner Tool v1.0
