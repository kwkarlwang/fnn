require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;
const mongoose = require("mongoose");

// Bodyparser Middleware
app.use(express.json());

// connect to database
mongoose
  .connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

app.use("/api/articles", require("./routes/api/articles"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
