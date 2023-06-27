import express from 'express';
import "reflect-metadata"
const app = express();

/*  DotEnv  */
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;

const home = require("./routes/homeRoute");
app.use("/", home);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});