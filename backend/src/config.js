require('dotenv').config();

module.exports = {
  port: Number(process.env.PORT) || 4000,
  corsOrigins: (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((s) => s.trim()),
  ocrSeconds: Number(process.env.OCR_SECONDS) || 2.5,
  allowedEmailDomains: ['xu.edu.ph', 'my.xu.edu.ph'],
};
