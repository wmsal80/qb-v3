import cors from 'cors';
import dotenv from 'dotenv';
import { createRequire } from 'module';
const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';
const app = require("express")();
dotenv.config();
const server = require("https").createServer(app);
const io = require("socket.io")(server, {
    cors: {
      origin: process.env.BASE_URL,
      methods: ["GET", "POST"]
    }
  });
  const whitelist = ['https://qb-v3-john.herokuapp.com', 'http://localhost:3000']
  const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }
app.use(cors());

app.all('*', function(req, res, next) {
  var origin = req.get('origin'); 
  res.header('Access-Control-Allow-Origin', origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
io.on("connect", (socket) => {
  console.log("user connected", socket.id);
  socket.on("chat-msg", function (data) {
    io.emit("chat-msg", data);
  });
});
server.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
.listen(PORT, function () {
  console.log(`SOCKET RUNNING... GO CATCH ${PORT}`);
});