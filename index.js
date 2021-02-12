//import dependencies
const neatCsv = require("neat-csv");

const csv = require('csv-parser')

const fs = require("fs");
const firstChallengeSolution = require("./helper/firstSolution");
const secondChallengeSolution = require("./helper/secondSolution");

//input file
const inputFile = "./sample_input.csv";
//output files
const firstChallengeResultFile = "firstChallengeResults.json";
const secondChallengeResultFile = "secondChallengeResults.json";
//to store converted javascript objects
const results = []


// console.log(results)
/**
 * @func mainFunction
 * @return {undefined}
 */
const mainFunction = async () => {
  /**
   * @func readDataFromCSV this will read data from file and convert into javascript object
   * @return {undefined}
   */
  const readDataFromCSV = () => {
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          const firstChallengeOutput = firstChallengeSolution(results);
          const secondChallengeOutput = secondChallengeSolution(results);
          writeDataToFile(firstChallengeOutput, firstChallengeResultFile);
          writeDataToFile(secondChallengeOutput, secondChallengeResultFile);
        } catch (err) {
          console.log(err);
        }
      })
  };
  /**
   * @func writeDataToFile this will write results to the file
   * @return {undefined}
   */
  const writeDataToFile = (result, file) => {
    const finalJSON = JSON.stringify({ result });
    //write finalJSON into file
    fs.writeFile(file, finalJSON, (err) => {
      try {
        console.log(`successfully write into ${file}`);
      } catch (err) {
        console.log(err);
      }
    });
  };
  readDataFromCSV();
};
mainFunction();
module.exports = mainFunction