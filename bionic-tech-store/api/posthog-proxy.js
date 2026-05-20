export default async function handler(req, res) {  
  try {  
    const targetPath = req.url.replace('/api/posthog-proxy', '');  
    const url = `https://eu.i.posthog.com${targetPath}`;

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
        'x-forwarded-for': req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',  
      },  
      body: req.method !== 'GET' && req.method !== 'HEAD' ? body : undefined,  
    });

    const text = await response.text();  
    res.status(response.status).send(text);  
  } catch (error) {  
    res.status(500).json({ error: 'Proxy error' });  
  }  
}

export const config = {  
  api: { bodyParser: false },  
};  