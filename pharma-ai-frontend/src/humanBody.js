import "./humanBody.css";

const organs = ["Brain","Lungs","Heart","Liver","Pancreas","Kidneys"];

export default function HumanBody({ analysis }) {
  return (
    <div className="body">
      {organs.map(o => {
        const active = analysis?.organImpact?.find(x => x.name === o)?.active;

        return (
          <div key={o} className={active ? "active" : ""}>
            {o}
          </div>
        );
      })}
    </div>
  );
}
