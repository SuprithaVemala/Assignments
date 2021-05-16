import express from "express";
import { run } from "./model/connection";
import { router } from "./routes/booksRoute";

const app = express();
const port = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Authorization");
  next();
})


app.use("/", router);
app.on("error", (err) => console.log(err));
app.listen(port, "localhost", () => {
  console.log(`server listening at http://localhost:5000`);
  run();
});
