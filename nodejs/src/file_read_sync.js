const fs = require('fs');

function moreWork() {
  console.log('Doing more work');
}

const data = fs.readFileSync('../nodejs.md'); // blocks here until file is read

console.log(data.toString());
moreWork(); // will run after console.log(data.toString())
