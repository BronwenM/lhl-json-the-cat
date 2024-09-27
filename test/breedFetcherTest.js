// breedFetcherTest.js

const fetchBreedDescription = require('../breedFetcher');
const {assert} = require('chai');

describe('fetchBreedDescription', () => {
  it('returns a string description for a valid breed, via callback', (done) => {
    fetchBreedDescription('Siberian', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      const expectedDesc = "The Siberians dog like temperament and affection makes the ideal lap cat and will live quite happily indoors. Very agile and powerful, the Siberian cat can easily leap and reach high places, including the tops of refrigerators and even doors.";

      // compare returned description
      assert.equal(expectedDesc, desc.trim());

      done();
    });
  });

  it('returns stringified list of all the breeds when an unspecific search term is entered with a prompt to try a more specifc term', (done) => {
    fetchBreedDescription('a', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      // compare returned description
      assert.include(desc.trim(), 'try again with a more specific name');

      done();
    });
  });

  it('returns a prompt to try again when nothing is returned by the search term "dog"', (done) => {
    fetchBreedDescription('dog', (err, desc) => {
      // we expect no error for this scenario
      assert.equal(err, null);

      // compare returned description
      assert.equal(`Hmmm... no cat breed 'dog' exists in TheCatAPI, try something else`, desc.trim());

      done();
    });
  });
});