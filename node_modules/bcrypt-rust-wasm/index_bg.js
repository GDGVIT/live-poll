
const path = require('path').join(__dirname, 'index_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./index.js'] = require('./index.js');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
