const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });


const app = require('./app');

const DB = process.env.DATABASE;

//db Configuration
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

const PORT = process.env.port || 3000;

//Server
 app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

