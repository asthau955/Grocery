import express from 'express';
import auth from './controllers/auth.controller';
import user from './controllers/user.controller';
import admin from './controllers/admin.controller';
import dotenv from 'dotenv';
import { schemaAndTestDataCreation } from './db/db';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api', auth);
app.use('/api/admin', admin);
app.use('/api/customer', user);

const PORT = process.env.PORT || 3000;

(async() => {
  await schemaAndTestDataCreation()
})()

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
