import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import { initSocketServer } from './lib/socket-server';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// Create the Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  console.log('Next.js app prepared');
  
  // Create HTTP server
  const server = createServer((req, res) => {
    try {
      const parsedUrl = parse(req.url || '', true);
      handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  // Initialize Socket.IO with our HTTP server
  const io = initSocketServer(server);
  console.log('Socket.IO server initialized');

  // Start listening
  server.listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
  
  // Handle server errors
  server.on('error', (err) => {
    console.error('Server error:', err);
  });
}); 