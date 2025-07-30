const express = require('express');
const connectDB = require('./config/db'); 
const app = express();
const cors = require('cors');

const PORT = 5000;


app.use(cors({ origin: 'http://localhost:5173' }));

connectDB(); 


app.use(express.json());

app.use('/api/todos', require('./routes/todoRoutes'));


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
