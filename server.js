const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const http = require("http").createServer(app);

// Express App Config
app.use(cookieParser()); // lets u read cookies
app.use(express.static("public")); // use the static folder named - public
app.use(express.json()); // lets u receive body
const { setupSocketAPI } = require("./services/socket.service");

if (process.env.NODE_ENV === "production") {
  // Express serve static files on production environment
  app.use(express.static(path.resolve(__dirname, "public")));
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      "https://harmony-apps.com",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
} else {
  // Configuring CORS
  const corsOptions = {
    // Make sure origin contains the url your frontend is running on
    origin: [
      "http://127.0.0.1:8080",
      "http://localhost:8080",
      "http://127.0.0.1:3000",
      "http://localhost:3000",
    ],
    credentials: true,
  };
  app.use(cors(corsOptions));
}

const authRoutes = require("./api/auth/auth.routes");
const userRoutes = require("./api/user/user.routes");
const stationRoutes = require("./api/station/station.routes");

// routes
const setupAsyncLocalStorage = require("./middlewares/setupAls.middleware");
app.all("*", setupAsyncLocalStorage);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/station", stationRoutes);
setupSocketAPI(http);
// app.get('/', (req, res) => res.send('Hello!'))

app.get("/**", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

const logger = require("./services/logger.service");
const port = process.env.PORT || 3030;
http.listen(port, () => {
  logger.info("Server is running on port: " + port);
});
