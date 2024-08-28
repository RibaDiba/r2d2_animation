const express = require("express");
const os = require("os");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/upload", (req, res) => {
    const jsonData = req.body;
    console.log("Received JSON data:", jsonData);
    res.send("JSON received");
});

app.post("/test", (req, res) => {
    console.log('recieved POST request')
    res.status.send(200)
})


const getLocalIPAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const interfaceInfo of interfaces[interfaceName]) {
      if (interfaceInfo.family === "IPv4" && !interfaceInfo.internal) {
        return interfaceInfo.address;
      }
    }
  }
  return "localhost";
};

app.listen(port, () => {
  const ipAddress = getLocalIPAddress();
  console.log(`Server is running on http://${ipAddress}:${port}`);
});
