export default function MoleculeViewer({ name }) {
  if (!name) return null;

  const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/PNG`;

  return (
    <div style={{ textAlign: "center" }}>
      <h3>Molecule Structure</h3>
      <img src={url} alt={name} style={{ width: "200px" }} />
    </div>
  );
}
