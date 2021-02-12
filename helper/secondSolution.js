const filterCorporateBonds = require("./filterCorporateBonds");
const filterGovernmentBonds = require("./filterGovernmentBonds");
const sortBonds = require("./sortBonds");

//use linear interpolation to find the unknown value
//y = [((x - x1) * (y2 - y1)) / (x2- x1) ]+ y1
// y = finalYield
// x1 = govBondWithLowestTerm
// x2 =  govBondWithHighestTerm
// x = govBondWithHighestYield
// y2 = corporateTerm
// y1 = govBondWithLowestYield;
/**
 * @func processData 
 * @param {array} data
 * @return {array}
 */
const processData = (data) => {
  //seperate corporate and gov bonds
  const corporateBonds = filterCorporateBonds(data);
  const governmentBonds = filterGovernmentBonds(data);
  const sortedBonds = sortBonds(governmentBonds);
  const govBondWithHighestTermObject = sortedBonds[sortedBonds.length - 1];
  const govBondWithLowestTermObject = sortedBonds[0];
  const govBondWithLowestYield = Number(
    govBondWithLowestTermObject.yield.slice(0, -1)
  );
  const govBondWithHighestYield = Number(
    govBondWithHighestTermObject.yield.slice(0, -1)
  );
  const govBondWithLowestTerm = Number(
    govBondWithLowestTermObject.term.split(" ")[0]
  );
  const govBondWithHighestTerm = Number(
    govBondWithHighestTermObject.term.split(" ")[0]
  );
  const differenceBtwYields = govBondWithHighestYield - govBondWithLowestYield;
  const differenceBtwTerms = govBondWithHighestTerm - govBondWithLowestTerm;
  const finalOutput = [];

  corporateBonds.forEach((bond) => {
    const corporateTerm = Number(bond.term.split(" ")[0]);
    const finalYield =
      (differenceBtwYields * (corporateTerm - govBondWithLowestTerm)) /
      differenceBtwTerms +
      govBondWithLowestYield;
    const corporateYield = Number(bond.yield.slice(0, -1));
    const spreadToCurve = corporateYield - finalYield;
    finalOutput.push({
      bond: bond.bond,
      spreadToCurve: `${spreadToCurve.toFixed(2)}%`,
    });
  });
  return finalOutput;
};

module.exports = processData;
