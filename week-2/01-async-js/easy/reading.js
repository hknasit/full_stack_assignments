// import fs from 'fs';
const fs = require('fs');

function readingFile(){
  const value = fs.readFile('file.txt', 'utf-8')
  console.log(value);
}

readingFile()