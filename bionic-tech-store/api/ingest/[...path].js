export const config = {  
  api: { bodyParser: false },  
};

export default async function handler(req, res) {  
  try {  
    const { path } = req.query;  
    const pathStr = Array.isArray(path) ? path.join('/') : path || '';  
    const queryString = req.url.includes('?')  
      ? req.url.substring(req.url.indexOf('?'))  
      : '';

    const url = `https://eu.i.posthog.com/${pathStr}${queryString}`;

    const body = await new Promise((resolve, reject) => {  
      const chunks = [];  
      req.on('data', (chunk) => chunks.push(chunk));  
      req.on('end', () => resolve(Buffer.concat(chunks)));  
      req.on('error', reject);  
    });

    const response = await fetch(url, {  
      method: req.method,  
      headers: {  
        'content-type': req.headers['content-type'] || 'text/plain',  
        'user-agent': req.headers['user-agent'] || '',  
        'x-forwarded-for':  
          req.headers['x-forwarded-for'] ||  
          req.socket?.remoteAddress ||  
          '',  
      },  
      body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,  
    });

    const text = await response.text();  
    res.status(response.status).send(text);  
  } catch (error) {  
    console.error('PostHog proxy error:', error);  
    res.status(500).json({ error: 'Proxy error' });  
  }  
}  