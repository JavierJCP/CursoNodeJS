import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import authTokenRouter from "./routes/authTokenRouter.js";

//crear servidor
const app = express();
dotenv.config();
const port = process.env.PORT;

//middleware
app.use(express.json());
app.use(express.text());

//routers
app.use("/user", userRouter);
app.use("/auth-token", authTokenRouter);

//levantar servidor
app.listen(port, () => {
  console.log(`App lista en http://localhost:${port}`);
});
