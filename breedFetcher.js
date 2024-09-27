const needle = require('needle');
const searchParameter = process.argv.slice(2).join(' ');

needle.get(`https://api.thecatapi.com/v1/breeds/search?q=${searchParameter}`, (error, response, body) => {
  if (error) {// Print the error if one occurred
    console.log('error:', error.code);
    throw new Error("hmmm looks like something's wrong with the host link", {cause: error.code});
  }
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    
  //Handle the output if the body of data has 0, 1 or more entries
  if (body.length === 0) console.log(`Hmmm... no cat breed '${searchParameter}' exists in TheCatAPI, try something else`);
  else if (body.length === 1) console.log(body[0].description); // Print the response from the api.
  else if (body.length > 1) {
    body.forEach(cat => {
      console.log("-----------------------------------------------------------------------");
      console.log(`\t\t\t${cat.name}`);
      console.log("-----------------------------------------------------------------------");
      console.log(cat.description);
      console.log("\n\n");
    });

    console.log(`There are ${body.length} entries with names that match '${searchParameter}' did you mean one of these?`);
    console.log(`If you didn't find what you were looking for, try again with a more specific name`);
  }
});