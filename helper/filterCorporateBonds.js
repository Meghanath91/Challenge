const filterCorporateBonds = (data) => {
  const corporateBonds = data.filter((bond) => bond.type === "corporate");
  return corporateBonds;
};
module.exports = filterCorporateBonds;
