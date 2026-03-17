const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

//Initialize db
require("./database/db");

const PORT = 5002;

//Routes
const userRouter = require("./routes/users");
app.use("/api/users", userRouter);
const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);
const artistRouter = require("./routes/artists");
app.use("/api/artists", artistRouter);
// const musicRouter = require("./routes/music");
// app.use("/api/music", musicRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
