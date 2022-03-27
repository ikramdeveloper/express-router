const path = require("path");
const express = require("express");
const cors = require("cors");
const { logger } = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");

const subdirRouter = require("./routes/subdir");
const rootRouter = require("./routes/root");
const employeesRouter = require("./routes/api/employees");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger);

const whitelist = [
  "https://www.yoursite.com",
  "http://127.0.0.1:5500",
  "http://localhost:3000",
  "https://www.google.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/subdir", express.static(path.join(__dirname, "public")));

app.use("/", rootRouter);
app.use("/subdir", subdirRouter);
app.use("/employees", employeesRouter);

app.all("*", (req, resp) => {
  resp.status(404);

  if (req.accepts("html")) {
    resp.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    resp.json({ err: "404 Not Found" });
  } else {
    resp.type("txt").json({ err: "404 Not Found" });
  }
});

app.use(errorHandler);

app.listen(PORT, console.log(`listening on port ${PORT}...`));
