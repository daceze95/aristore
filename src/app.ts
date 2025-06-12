import express from 'express';
import 'dotenv/config';
import { API_VERSION, port } from './config/appConfig';
import indexRouter from './routes/indexRoute';
import userRouter from './routes/userRoute';
import pino from 'pino-http';

const app = express();
const logger = pino();

app.use(express.json());
app.use(logger);

app.use(`${API_VERSION}/`, indexRouter);
app.use(`${API_VERSION}/users`, userRouter);

app.listen(port, () => {console.log(`[server]: running on http://localhost:${port}`)})