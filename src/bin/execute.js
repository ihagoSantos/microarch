#!/usr/bin/env node
const createArchitecture = require('../lib/index.js').createArchitecture
const args = process.argv.splice(process.execArgv.length + 2);
const name = args[0]
const extension = args[1]
createArchitecture(name, extension);