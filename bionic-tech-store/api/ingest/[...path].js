export default async function handler(req, res) {
  // Витягуємо все після /api/ingest (включно з query string)
  const afterIngest = req.url.replace(/^\/api\/ingest/, '') || '/';
  const url = `https://eu.i.posthog.com${afterIngest}`;

  // Копіюємо заголовки
  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (key !== 'host' && key !== 'connection') {
      headers[key] = value;
    }
  }
  headers['host'] = 'eu.i.posthog.com';

  // Читаємо тіло запиту (для POST)
  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await new Promise((resolve) => {
      const chunks = [];
      req.on('data', chunk => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
    });
  }

  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  // Передаємо заголовки відповіді (без тих що ламають)
  response.headers.forEach((value, key) => {
    if (key !== 'content-encoding' && key !== 'transfer-encoding') {
      res.setHeader(key, value);
    }
  });

  const data = await response.arrayBuffer();
  res.status(response.status).send(Buffer.from(data));
}