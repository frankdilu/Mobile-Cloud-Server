// Rename this sample file to main.js to use on your project.
// The main.js file will be overwritten in updates/reinstalls.

var rn_bridge = require('rn-bridge');

// Echo every message received from react-native.

rn_bridge.channel.on('message', (msg) => {
  rn_bridge.channel.send(msg+" : Main");
} );

// Inform react-native node is initialized.
rn_bridge.channel.send("Node was initialized.");


// MINE

const express = require('express');
const cors = require('cors');
const contentRouter = require('./routes/content');
const uploadRouter = require('./routes/upload');
const deleteRouter = require('./routes/delete');
const downloadRouter = require('./routes/download');
const dirRouter = require('./routes/dir');
const enoent = require('./middlewares/enoent');
const eexist = require('./middlewares/eexist');
const err = require('./middlewares/err');

const path = require('path');

const port = process.env.PORT || 5000;
rn_bridge.channel.send(port)


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes

app.use('/', express.static(path.join(__dirname, 'front')));
app.use('/apiContent', contentRouter);
app.use('/apiUpload', uploadRouter);
app.use('/apiDownload', downloadRouter);
app.use('/apiDir', dirRouter);
app.use('/apiDelete', deleteRouter);

// Errors
app.use(enoent);
app.use(eexist);
app.use(err);
// Server
// app.listen(port, () => console.log(port));
app.listen(port, () => rn_bridge.channel.send(port));

