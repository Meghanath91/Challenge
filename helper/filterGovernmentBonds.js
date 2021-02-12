const filterGovernmentBonds = (data) => {
  const governmentBonds = data.filter((bond) => bond.type === "government");
  return governmentBonds;
};
module.exports = filterGovernmentBonds;
