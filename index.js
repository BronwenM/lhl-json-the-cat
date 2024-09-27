const fetchBreedDescription = require('./breedFetcher');

const searchParameter = process.argv.slice(2).join(' ');

fetchBreedDescription(searchParameter, (error, desc) => {
  if (error) {
    console.log('error:', error.code);
    throw new Error("hmmm looks like something's wrong with the host link", { cause: error.code });
  } else {
    console.log(desc);
  }
});