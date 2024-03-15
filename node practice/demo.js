const fs = require('fs');
const read = fs.createReadStream('text.txt', 'utf8');

read.on('data', chunk => console.log(chunk));
read.on('error', err => console.error('Error:', err));
// const write=fs.createWriteStream('text2.txt');
// read.pipe(write);