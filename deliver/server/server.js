require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World'));

app.use('/auth', require('./routes/userRoutes'));
app.use(errorHandler);

const port = process.env.PORT || 5000;

connectDB();

app.listen(port, () => console.log(`Server is up and running on port ${port}`));
