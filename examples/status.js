const socket = require('../yamahacontrol.js');

// socket.port = 49280;
socket.localPort = 59486;
// socket.logging = true;
socket.connect("10.75.17.40");

socket.on('data', (e) => { console.log("Script: Data:", e.toString()); });

socket.send("devstatus runmode");
