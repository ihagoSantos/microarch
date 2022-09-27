#!/usr/bin/env node

import createArchitecture from '../lib/index.js';
const args = process.argv.splice(process.execArgv.length + 2);
const name = args[0]
const extension = args[1]
await createArchitecture(name, extension);