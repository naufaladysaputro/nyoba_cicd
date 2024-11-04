const http = require("http");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const path = require("path");
const routes = require("./routes");
require("dotenv").config();

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//imagekit
const imagekitRouter = require('./routes/imagekit');
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', imagekitRouter);
// const ImageKit = require("imagekit");

// const imagekit = new ImageKit({
//   publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
//   privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
//   urlEndpoint: process.env.IMAGEKIT_URL,
// });

// module.exports = imagekit;


// const imagekitRouter = require("./routes/imagekit");
// app.use('/api/v1', imagekitRouter);


//multer
app.use("/image", express.static("/uploads"));
app.use("/files", express.static("public/files"));

const mediaRouter = require("./routes/api/v1/media.routers");
app.use( '/api/v1', mediaRouter);

const fs = require('fs');
const dir = '/uploads';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}



//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./docs/openapi.json");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);
// app.use((err, req, res, next) => {
//   res.status(err.status).json({
//       status: false,
//       message: err.message
//   })
// })

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode).json({
      message: err.message || "Internal Server Error"
  });
});


const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}
