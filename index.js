//import dependencies
const neatCsv = require("neat-csv");
const fs = require("fs");
const firstChallengeSolution = require("./helper/firstSolution");
const secondChallengeSolution = require("./helper/secondSolution");

//input file
const inputFile = "./sample_input.csv";
//output files
const firstChallengeResultFile = "firstChallengeResults.json";
const secondChallengeResultFile = "secondChallengeResults.json";

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
    fs.readFile(inputFile, async (err, data) => {
      try {
        const javaScriptObject = await neatCsv(data);
        const firstChallengeOutput = firstChallengeSolution(javaScriptObject);
        const secondChallengeOutput = secondChallengeSolution(javaScriptObject);
        writeDataToFile(firstChallengeOutput, firstChallengeResultFile);
        writeDataToFile(secondChallengeOutput, secondChallengeResultFile);
      } catch (err) {
        console.log(err);
      }
    });
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