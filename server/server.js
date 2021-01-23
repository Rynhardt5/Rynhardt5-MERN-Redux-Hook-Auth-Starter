const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

const errorHandler = require("./middleware/error-handler");
const httpError = require("./utils/http-error");

// GET ENV KEYS
require("dotenv").config();

// CONNECT TO DB
require("./config/mongodb");

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("tiny"));

//ROUTES
app.use("/users", require("./routes/userRoutes"));

// IF A ROUTE ISN'T FOUND
app.use((req, res, next) => {
  throw new httpError("Could not find this route.", 404);
});

// HANDLE ERRORS PASSED THROUGH NEXT
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on PORT:${PORT}`));
