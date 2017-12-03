const fs = require('fs');

function moreWork() {
  console.log('Doing more work');
}

const data = fs.readFile('../nodejs.md', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

moreWork(); // will run before console.log(data.toString())
