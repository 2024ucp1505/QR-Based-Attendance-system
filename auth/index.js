const express = require("express");

const facultyRoutes = require("./routes/facultyRoutes");
const studentRoutes = require("./routes/studentRoutes");

const app = express();
app.use(express.json());

app.use("/faculty", facultyRoutes);
app.use("/student", studentRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
