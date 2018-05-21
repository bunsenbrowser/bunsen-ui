const RPC = require('./rpc')
const idb = require('random-access-idb')

console.log("Making RPC and idb global.")
window.RPC = RPC;
window.idb = idb;

