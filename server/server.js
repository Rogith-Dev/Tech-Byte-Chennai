const mongoose = require('mongoose');
require('dotenv').config({ path: './config.env' });


const app = require('./app');

//db Configuration

mongoose.connect(process.env.DATABASE)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));


const PORT = process.env.port || 3000;

//Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

