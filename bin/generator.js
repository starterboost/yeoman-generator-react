#!/usr/bin/env node
const {spawn} = require('child_process');

async function main() {
  const filePath = process.argv[2];

  const childProcess = spawn( 'yo', ['starterboost-react'],
	{stdio: [process.stdin, process.stdout, process.stderr]}); // (A)
}

main();