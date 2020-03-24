const express = require('express');

const cors = require('cors');

const ongsRoutes = require('./routes');

const app = express();

app.use(cors());

app.use(express.json());

app.use(ongsRoutes);

app.listen(3333);