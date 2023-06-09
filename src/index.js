const express = require('express');
const v1TasklRouter = require('./v1/routes/tasks');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/v1/task', v1TasklRouter);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`✅ Server running on port ${PORT}`);
    })
  }

module.exports = app;