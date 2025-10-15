import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import { logger } from './middleware/logger.js';
import 'dotenv/config';
import { connectMongoDB } from './db/connectMongoDB.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
await connectMongoDB();
const PORT = process.env.PORT ?? 3030;

const app = express();
app.use(express.json());
app.use(cors());
app.use(logger);

app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
