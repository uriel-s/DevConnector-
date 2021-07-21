
const express =  require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path')
// Connect Database
connectDB();



const PORT = process.env.PORT || 5000;
//app.get('/', (req,res)=>res.send('API running') );

app.use(express.json());

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/users', require('./routes/api/users'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
