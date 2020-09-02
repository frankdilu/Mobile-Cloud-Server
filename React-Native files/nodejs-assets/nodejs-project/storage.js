require('dotenv').config();
const rn_bridge = require('rn-bridge'); 

const fs = require("fs")
const path = require("path")

// const storage = path.join(__dirname, "static")
let createPath = async ()=>{
  await fs.promises.mkdir(path.join(rn_bridge.app.datadir(), "public"));
}
createPath()
const storage = path.join(rn_bridge.app.datadir(), "public");
if (!storage) {
  console.error(
    'Storage path not defined,',
    'set a value for HOME_CLOUD_STORAGE environment variable'
  );
  process.exit(1);
}

module.exports = storage;
