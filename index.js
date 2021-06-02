const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Import Route
const bookRoutes = require("./routes/bookRoutes")
// require("./routes/bookRoutes")(app);

// Global
var corsOptions = {
    origin: "http://localhost:8081"
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json()); // parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

app.get('/', (req, res) => {
    res.send('Hallo')
})

app.use('/api/book', bookRoutes)

const db = require('./models')
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})