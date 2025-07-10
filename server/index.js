const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const PDFDocument = require('pdfkit');
const sizeOf = require('image-size');

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Ensure submissions directory exists
const submissionsDir = path.join(__dirname, 'submissions');
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir);
}

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// CSV Writer setup
const csvPath = path.join(__dirname, 'submissions.csv');
const csvWriter = createCsvWriter({
  path: csvPath,
  header: [
    {id: 'fullName', title: 'Full Name'},
    {id: 'email', title: 'Email'},
    {id: 'phone', title: 'Phone'},
    {id: 'country', title: 'Country'},
    {id: 'dateOfBirth', title: 'Date of Birth'},
    {id: 'passport', title: 'Passport File'},
    {id: 'driverLicense', title: 'Driver License File'}
  ],
  append: true
});

// Endpoint to receive form data and files
app.post('/submit', upload.fields([
  { name: 'passport', maxCount: 1 },
  { name: 'driverLicense', maxCount: 1 }
]), async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;
    // Generate unique PDF filename
    const pdfFilename = `${Date.now()}-${data.fullName.replace(/\s+/g, '_')}.pdf`;
    const pdfPath = path.join(submissionsDir, pdfFilename);
    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(pdfPath);
    doc.pipe(writeStream);

    // Add form data
    doc.fontSize(18).text('Lottery Registration', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Full Name: ${data.fullName}`);
    doc.text(`Email: ${data.email}`);
    doc.text(`Phone: ${data.phone}`);
    doc.text(`Country: ${data.country}`);
    doc.text(`Date of Birth: ${data.dateOfBirth}`);
    doc.moveDown();

    // Add images if present
    const addFileLinkToPDF = (file, label, req) => {
      if (file) {
        const fileUrl = req.protocol + '://' + req.get('host') + '/uploads/' + file.filename;
        doc.text(`${label}: `, { continued: true });
        doc.fillColor('blue').text(file.originalname, { link: fileUrl, underline: true });
        doc.fillColor('black');
        doc.moveDown();
      }
    };
    addFileLinkToPDF(files.passport ? files.passport[0] : null, 'Passport/ID', req);
    addFileLinkToPDF(files.driverLicense ? files.driverLicense[0] : null, "Driver's License", req);

    doc.end();
    writeStream.on('finish', () => {
      res.status(200).json({ message: 'Submission received and PDF saved.', pdf: `/submissions/${pdfFilename}` });
    });
    writeStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to save PDF.' });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save submission.' });
  }
});

// Serve uploaded images for viewing
app.use('/uploads', express.static(uploadsDir));
// Serve submissions directory for PDF download
app.use('/submissions', express.static(submissionsDir));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 