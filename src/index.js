const express = require('express');
const v1TasklRouter = require('./v1/routes/tasks');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/v1/tasks', v1TasklRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})