const sortArray = require("./sortArray");
const filterCorporateBonds = require("./filterCorporateBonds");
const filterGovernmentBonds = require("./filterGovernmentBonds");

/**
 * @func calculateTermDifference
 * @param {array} corpTerm
 * @param {array} govTerm
 * @return {number}
 */
const calculateTermDifference = (corpTerm, govTerm) =>
  Math.abs(Number(corpTerm.split(" ")[0]) - Number(govTerm.split(" ")[0]));

/**
 * @func calculateSpreadToBenchmark
 * @param {array} corpTerm
 * @param {array} govTerm
 * @return {number}
 */
const calculateSpreadToBenchmark = (corpTerm, govTerm) =>
  Math.abs(
    Number(corpTerm.slice(0, -1)) - Number(govTerm.slice(0, -1))
  ).toFixed(2);

/**
 * @func processData
 * @param {array} data
 * @return {array}
 */
const processData = (data) => {
  const finalOutput = [];
  //seperate bonds
  const corporateBonds = filterCorporateBonds(data);
  const governmentBonds = filterGovernmentBonds(data);

  //loop through each corporate bond and compare the term with each govbond
  corporateBonds.forEach((corporateBond) => {
    const termDifference = [];
    governmentBonds.forEach((governmentBond) => {
      //create objects with required data
      termDifference.push({
        termDifference: calculateTermDifference(
          corporateBond.term,
          governmentBond.term
        ),
        governmentBond: governmentBond.bond,
        corporateBond: corporateBond.bond,
        spreadToBenchMark: calculateSpreadToBenchmark(
          corporateBond.yield,
          governmentBond.yield
        ),
      });
    });
    finalOutput.push(sortArray(termDifference));
  });
  return finalOutput;
};

module.exports = processData;
