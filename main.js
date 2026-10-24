import express from 'express';
import configService from './src/config/config.service.js';
import { userRouter, noteRouter } from './src/index.js';
import { connectDB } from './src/db/connection.js';
let port = configService.PORT;
let app = express();
app.use(express.json());
await connectDB();

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;