export const config = {  
  api: { bodyParser: false },  
};

async function getBody(req) {  
  const chunks = [];  
  for await (const chunk of req) {  
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);  
  }  
  return Buffer.concat(chunks);  
}

export default async function handler(req, res) {  
  const { path } = req.query;  
  const pathStr = Array.isArray(path) ? path.join('/') : path || '';  
  const queryString = req.url.includes('?')  
    ? req.url.substring(req.url.indexOf('?'))  
    : '';

  const url = `https://eu.i.posthog.com/${pathStr}${queryString}`;

  const fetchOptions = {  
    method: req.method,  
    headers: {  
      'content-type': req.headers['content-type'] || 'text/plain',  
      'user-agent': req.headers['user-agent'] || '',  
    },  
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {  
    fetchOptions.body = await getBody(req);  
  }

  const response = await fetch(url, fetchOptions);  
  const text = await response.text();  
  res.status(response.status).send(text);  
}  