// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const ChromeLauncher = require('chrome-launcher/dist/index');

const api = require('./server/routes/api');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'www')));
app.use('/api', api);
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'www/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`API running on localhost:${port}`);
  ChromeLauncher.launch({
    startingUrl: 'http://127.0.0.1:' + port,
    chromeFlags: [
      '--disable-web-security',
      '--disable-print-preview',
      '--disable-pinch --disabled',
      '--enable-file-manager-touch-mode',
      '--disable-touch-drag-drop',
      '--disable-touch-adjustment',
      '--disable-translate-new-ux',
      '--disable-session-crashed-bubble',
      '--user-data-dir="C:\\chomedev"',
      '--test-type',
      '--kiosk',
    ],
  }).then((chrome) => {
    console.log('Chrome debugging port running on', chrome.port);
  });
});
