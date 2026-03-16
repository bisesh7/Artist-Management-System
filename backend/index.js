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
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
