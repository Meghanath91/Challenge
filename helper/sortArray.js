/**
 * @func sortArray sort array to find the highest term difference
 * @param {array} arr
 * @return {array}
 */
const sortArray = (arr) => {
  const sortedArray = arr.sort((a, b) => {
    const current = a.termDifference;
    const next = b.termDifference;
    if (current < next) return -1;
    if (current > next) return 1;
    return 0;
  });
  const BondWithHighestTermDifference = sortedArray[sortArray.length - 1];
  return {
    bond: BondWithHighestTermDifference.corporateBond,
    benchmark: BondWithHighestTermDifference.governmentBond,
    spreadToBenchMark: `${BondWithHighestTermDifference.spreadToBenchMark}%`,
  };
};

module.exports = sortArray;
