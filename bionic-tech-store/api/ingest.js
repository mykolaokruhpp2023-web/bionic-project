export default async function handler(req, res) {
  // Витягуємо шлях після /ingest
  const path = req.url.replace(/^\/ingest/, '') || '/';
  const url = `https://eu.i.posthog.com${path}`;

  // Копіюємо заголовки, але замінюємо host
  const headers = { ...req.headers };
  delete headers.host;
  headers['host'] = 'eu.i.posthog.com';

  let body = undefined;
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    body = await new Promise((resolve) => {
      let data = '';
      req.on('data', chunk => data += chunk);
      req.on('end', () => resolve(data));
    });
  }

  const response = await fetch(url, {
    method: req.method,
    headers,
    body,
  });

  const text = await response.text();

  // Передаємо заголовки відповіді
  response.headers.forEach((value, key) => {
    if (key !== 'content-encoding') res.setHeader(key, value);
  });

  res.status(response.status).send(text);
}