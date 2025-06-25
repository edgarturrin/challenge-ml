import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from './App';

export default function ssr(req, res) {
  const appHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const html = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Challenge ML</title>
        <link rel="stylesheet" href="/static/bundle.css" />
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  `;

  res.send(html);
}
