const express = require("express");

const chalk = require("chalk");
const mongoose = require("mongoose");
const cors = require("cors");

var config = require("./config.js");
const routes = require("./routes");

const app = express();

const http = require("http").Server(app);

var dev_db_url = config.db.url;

app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const corsOptions = {
  origin: [
    "https://nobleedugroup-3ff8f.web.app/",
    "https://nobleedugroup-3ff8f.web.app",
    "http://nobleedugroup-3ff8f.web.app/",
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8000",
    "http://localhost:8001/",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:8000",
    "http://127.0.0.1:8003/",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(routes);

// mongoose.set("useCreateIndex", true);
mongoose
  .connect(dev_db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = config.PORT;
    const HOST = config.HOST;
    http.listen(PORT, HOST, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on "
        )} http://${chalk.bgMagenta.white(HOST)}:${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(chalk.red(err)));
