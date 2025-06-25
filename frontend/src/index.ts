import 'dotenv/config';

import express from 'express';
import path from 'path';
import ssr from './web/ssr';
import productsRouter from './bff/routes/products';

const app = express();
const PORT = process.env.PORT;

app.use("/static", express.static(path.join(__dirname, '../public')));

app.use('/api/products', productsRouter);
app.get('*', ssr);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
