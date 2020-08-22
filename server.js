require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const MONGOURI = process.env.MONGOURI;
const mongoose = require("mongoose");
const path = require("path")

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

// Serve static assets
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
