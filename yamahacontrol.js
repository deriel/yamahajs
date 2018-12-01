const net = require('net');

let socket = {};
module.exports = {
  listeners: [];
  socket: {},
  logging: true,
  initiated: false,
  port: 49280,
  init: () => {
    module.exports.socket = new net.Socket();
    if(module.exports.logging) {
      module.exports.socket.on('connection', (e) => { console.log("YAMAHA: Socket connected", e); });
      module.exports.socket.on('close', (e) => { console.log("YAMAHA: Socket closed", e); });
      module.exports.socket.on('data', (e) => { console.log("YAMAHA: Data:", e)});
      module.exports.socket.on('drain', (e) => { console.log("YAMAHA: Drain:", e)});
      module.exports.socket.on('error', (e) => { console.log("YAMAHA: Error:", e)});
      module.exports.socket.on('end', (e) => { console.log("YAMAHA: End:", e)});
      module.exports.socket.on('ready', (e) => { console.log("YAMAHA: Ready:", e)});
      module.exports.socket.on('timeout', (e) => { console.log("YAMAHA: Timeout:", e); module.exports.socket.end(); module.exports.init(); module.exports.connect(); });
    }
    module.exports.initiated = true;
    for(var i in module.exports.listeners) {
      module.exports.socket.on(module.exports.listeners[i].e, module.exports.listeners[i].cb);
    }
  }
  connect: (ip) => {
    if(!module.exports.initiated) {
      module.exports.init();
    }
    let opts = {
      port: module.exports.port,
      host: ip,
      family: 4,
    };
    if(module.exports.localPort) {
      opts.localPort = module.exports.localPort;
    }
    socket.connect(opts);
  }
  send: (msg) => {
    module.exports.socket.write(msg+"\n");
  }
  on: (e, cb) => {
    listeners.push({e, cb});
    module.exports.socket.on(e, cb);
  }
}
