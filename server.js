import express from "express";

import dotenv from "dotenv";

// config
dotenv.config();

//rest objects
const app = express();

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to Job Portal</h1>`);
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
