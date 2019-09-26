
const fs = require('fs');
const request = require('request');

const userArgs = process.argv.splice(2);
url = userArgs[0];
localPath = userArgs[1]

request(url, (error, response, body) => {
  if (error){
    console.log(`\n\n::::there was an error:::: \n \n ${error} \n \n This will not be downloaded, sorry!`)
  } else {
    fs.access(localPath, fs.constants.F_OK, (err) => {
      console.log(`${localPath} ${err ? 'does not exist' : 'exists'}`);
    });
    if (fs.existsSync(localPath)) {
      console.log('already exists...overwriting file')
    }
    fs.writeFile(localPath, body, (err) => {
      if (err)  {
        console.log(err);
      } else {
      let size = fs.statSync(localPath).size;
      console.log(`downloaded and saved ${size} bytes to ${localPath}`);
      }
    })
  }
});

