const organs = [
  "Brain",
  "Lungs",
  "Heart",
  "Liver",
  "Pancreas",
  "Kidneys"
];

const mapOrganGlow = (primaryOrgan) => {
  return organs.map(org => ({
    name: org,
    active: org.toLowerCase() === primaryOrgan?.toLowerCase()
  }));
};

module.exports = { mapOrganGlow };