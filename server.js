import tasksRouter from "./tasksRouter.js";
import authRouter from "./authenticationRouter.js"
import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/tasks", tasksRouter);

app.use("/authentication",authRouter)

app.use((err, req, res, next) => {
  res.status(500).send(err.stack);
});

app.listen(3000, function () {
  console.log("server is runing on por 3000 ");
});
