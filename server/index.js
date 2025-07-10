const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const cors = require('cors');
const PDFDocument = require('pdfkit');
const sizeOf = require('image-size');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: 'dfp18npb1',
  api_key: '381916922338158',
  api_secret: '2Qw6QwQwQwQwQwQwQwQwQwQwQwQwQwQw' // Replace with your actual API secret
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'lottery_uploads', // This is the folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'pdf'],
    resource_type: 'auto'
  }
});

const upload = multer({ storage: storage });

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Ensure submissions directory exists
const submissionsDir = path.join(__dirname, 'submissions');
if (!fs.existsSync(submissionsDir)) {
  fs.mkdirSync(submissionsDir);
}

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
    console.log('BODY:', req.body);
    console.log('FILES:', req.files);

    // Check if files are present
    if (!req.files || (!req.files.passport && !req.files.driverLicense)) {
      console.error('No files uploaded!');
      return res.status(400).json({ error: 'No files uploaded!' });
    }

    // Get Cloudinary URLs
    const passportUrl = req.files.passport ? req.files.passport[0].path : '';
    const driverLicenseUrl = req.files.driverLicense ? req.files.driverLicense[0].path : '';
    console.log('Cloudinary passport URL:', passportUrl);
    console.log('Cloudinary driver license URL:', driverLicenseUrl);

    // Generate unique PDF filename
    const data = req.body;
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

    // Add Cloudinary links to PDF
    const addFileLinkToPDF = (url, label) => {
      if (url) {
        doc.text(`${label}: `, { continued: true });
        doc.fillColor('blue').text(url, { link: url, underline: true });
        doc.fillColor('black');
        doc.moveDown();
      }
    };
    addFileLinkToPDF(passportUrl, 'Passport/ID');
    addFileLinkToPDF(driverLicenseUrl, "Driver's License");

    doc.end();
    writeStream.on('finish', () => {
      res.status(200).json({ message: 'Submission received and PDF saved.', pdf: `/submissions/${pdfFilename}` });
    });
    writeStream.on('error', (err) => {
      console.error(err);
      res.status(500).json({ error: 'Failed to save PDF.' });
    });
  } catch (err) {
    console.error('Error in /submit:', err);
    res.status(500).json({ error: 'Failed to save submission.' });
  }
});

// Serve submissions directory for PDF download
app.use('/submissions', express.static(submissionsDir));

app.get('/list-submissions', (req, res) => {
  fs.readdir(submissionsDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to list files' });
    }
    res.json(files);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 