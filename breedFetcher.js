const needle = require('needle');

const fetchBreedDescription = (breedName, callback) => {
  needle.get(`https://api.thecatapi.com/v1/breeds/search?q=${breedName}`, (error, response, body) => {
    let errOut = error;
    let bodyOut;

    if (!error) {
      //Handle the output if the body of data has 0, 1 or more entries
      if (body.length === 0) bodyOut = `Hmmm... no cat breed '${breedName}' exists in TheCatAPI, try something else`;
      else if (body.length === 1) bodyOut = body[0].description; // Print the response from the api.
      else if (body.length > 1) {
        bodyOut = [];
        body.forEach(cat => {
          bodyOut.push(`-----------------------------------------------------------------------${'\n\t\t\t'}${cat.name}${'\n'}-----------------------------------------------------------------------${'\n'}${cat.description}${'\n\n'}`);
        });
        bodyOut.push(`There are ${body.length} entries with names that match '${breedName}' did you mean one of these?`),
        bodyOut.push(`If you didn't find what you were looking for, try again with a more specific name`);
        bodyOut = bodyOut.join('\n');
      }
    }
    
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    callback(errOut, bodyOut);
  });
};

module.exports = fetchBreedDescription;