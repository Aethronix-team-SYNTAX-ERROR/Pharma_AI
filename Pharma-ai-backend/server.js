require("dotenv").config();
const express = require("express");
const cors = require("cors");

const drugRoutes = require("./routes/drugRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/drugs", drugRoutes);

app.get("/", (req, res) => {
  res.send("Pharma AI Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});