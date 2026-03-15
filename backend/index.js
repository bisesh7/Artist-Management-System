const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "*",
  }),
);
app.use(bodyParser.json());

//Initialize db
require("./database/db");

const PORT = 5002;

//Routes
const userRouter = require("./routes/users");
app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
