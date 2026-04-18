module.exports = (organ) => {
  const organs = ["Brain","Lungs","Heart","Liver","Pancreas","Kidneys"];

  return organs.map(o => ({
    name: o,
    active: o.toLowerCase() === (organ || "").toLowerCase()
  }));
};
