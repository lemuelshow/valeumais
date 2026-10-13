// Servidor estático mínimo para hospedar o build (dist/) em plataformas como o Render (Web Service).
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
const porta = Number(process.env.PORT || 4173);

const TIPOS = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon', '.json': 'application/json',
  '.woff2': 'font/woff2', '.webmanifest': 'application/manifest+json',
};

if (!fs.existsSync(path.join(raiz, 'index.html'))) {
  console.error('Pasta dist/ não encontrada. Rode "npm run build" antes de "npm start".');
  process.exit(1);
}

http.createServer((req, res) => {
  const url = decodeURIComponent((req.url || '/').split('?')[0]);
  let arquivo = path.normalize(path.join(raiz, url));
  if (!arquivo.startsWith(raiz)) { res.writeHead(403).end(); return; }
  if (!fs.existsSync(arquivo) || fs.statSync(arquivo).isDirectory()) arquivo = path.join(raiz, 'index.html');

  const ext = path.extname(arquivo);
  const cache = arquivo.includes(`${path.sep}assets${path.sep}`) ? 'public, max-age=31536000, immutable' : 'no-cache';
  res.writeHead(200, { 'Content-Type': TIPOS[ext] || 'application/octet-stream', 'Cache-Control': cache });
  fs.createReadStream(arquivo).pipe(res);
}).listen(porta, '0.0.0.0', () => console.log(`Valeu+ em http://localhost:${porta}`));
