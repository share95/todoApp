const express = require("express");
const connectDb = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

const dotenv = require("dotenv").config();

connectDb();
const app = express();
const port = process.env.PORT || 5000;
const allowOptionsRequests = require("./middleware/allowOptionsRequest");



app.use(express.json());
app.use(allowOptionsRequests);
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


app.use("/api/tasks", require("./routes/tasksRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
