import { motion } from "framer-motion";
import "./humanBody.css";

const organs = [
  { name: "Brain", top: "10%", left: "50%" },
  { name: "Lungs", top: "25%", left: "50%" },
  { name: "Heart", top: "30%", left: "52%" },
  { name: "Liver", top: "45%", left: "55%" },
  { name: "Pancreas", top: "50%", left: "48%" },
  { name: "Kidneys", top: "55%", left: "50%" }
];

export default function HumanBody({ analysis }) {
  return (
    <div className="bodyWrapper">
      <div className="body">
        {organs.map((org, i) => {
          const active = analysis?.organImpact?.find(o => o.name === org.name)?.active;

          return (
            <motion.div
              key={i}
              className={`organDot ${active ? "active" : ""}`}
              style={{ top: org.top, left: org.left }}
              animate={{
                scale: active ? 1.4 : 1,
                boxShadow: active ? "0 0 25px #FFC1CC" : "0 0 0px"
              }}
            >
              <span>{org.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
