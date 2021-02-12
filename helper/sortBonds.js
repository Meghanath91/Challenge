/**
 * @func sortBonds sort bonds according to term to find the highest and lowest
 * @param {array} arr
 * @return {array}
 */
const sortBonds = (arr) => {
  const sortedArray = arr.sort((a, b) => {
    const current = Number(a.term.split(' '));
    const next = Number(b.term.split(' '));
    if (current < next) return -1;
    if (current > next) return 1;
    return 0;
  });
  return sortedArray
};

module.exports = sortBonds