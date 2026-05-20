export default async function handler(req, res) {  
  const pathParts = req.query.path || [];  
  const pathStr = Array.isArray(pathParts) ? pathParts.join('/') : pathParts;  
  const queryStart = req.url.indexOf('?');  
  const queryString = queryStart !== -1 ? req.url.slice(queryStart) : '';  
  const url = `https://eu.i.posthog.com/${pathStr}${queryString}`;

  try {  
    const chunks = [];  
    await new Promise((resolve, reject) => {  
      req.on('data', chunk => chunks.push(chunk));  
      req.on('end', resolve);  
      req.on('error', reject);  
    });  
    const body = Buffer.concat(chunks);

    const response = await fetch(url, {  
      method: req.method,  
      headers: {  
        'content-type': req.headers['content-type'] || 'text/plain',  
        'user-agent': req.headers['user-agent'] || '',  
        'x-forwarded-for': req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '',  
      },  
      body: body.length > 0 ? body : undefined,  
    });

    const data = await response.arrayBuffer();  
    res.status(response.status).send(Buffer.from(data));  
  } catch (err) {  
    console.error(err);  
    res.status(500).send('error');  
  }  
}  