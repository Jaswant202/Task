const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { initDB } = require('./config/db');
const taskRoutes = require('./routes/taskRoute');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
app.get('/', (req, res) => {
  res.send('Task Management MySQL API is running...');
});
const PORT = process.env.PORT || 5000;
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});