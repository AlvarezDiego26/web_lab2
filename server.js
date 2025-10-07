require('dotenv').config();  // Carga variables de entorno del archivo .env

const http = require('http');
const fs = require('fs');
const path = require('path');
const querystring = require('querystring');

const port = process.env.PORT || 4000;  // Usa el puerto de Render o 4000 localmente

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif'
};

const server = http.createServer((req, res) => {
  console.log(`Solicitud recibida para: ${req.url}`);

  if (req.method === 'POST' && req.url === '/contacto') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const formData = querystring.parse(body);

      console.log('📩 Nuevo mensaje recibido:');
      console.log(formData);

      res.writeHead(302, { 'Location': '/confirmacion.html' });
      res.end();
    });

    return;
  }

  let fileUrl = req.url === '/' ? '/index.html' : req.url;

  if (fileUrl === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }

  if (fileUrl.includes('..')) {
    res.writeHead(400, { 'Content-Type': 'text/html' });
    res.end('Solicitud no válida');
    return;
  }

  const filePath = path.join(__dirname, 'public', fileUrl);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<h1>404 - Página no encontrada</h1>');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    }
  });
});

server.listen(port, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${port}`);
});
