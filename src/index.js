const express = require("express");
const cors = require("cors");
const dataSource = require("./utils").dataSource;

const WilderController = require("./controllers/WilderController");
const SkillController = require("./controllers/SkillController");
const GradeController = require("./controllers/GradeController");

const app = express();

app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.get("/api/wilder", WilderController.read);
app.post("/api/wilder", WilderController.create);
app.put("/api/wilder/:id", WilderController.edit);
app.delete("/api/wilder/:id", WilderController.delete);
app.post("/api/wilderwithskills", WilderController.addSkill);

app.get("/api/skill", SkillController.read);
app.post("/api/skill", SkillController.create);
app.put("/api/skill/:id", SkillController.edit);
app.delete("/api/skill/:id", SkillController.delete);

app.get("/api/wilderWithGrade", GradeController.read);
app.post("/api/wilderWithSkillsAndGrade", GradeController.create);
app.put("/api/grade/:id", GradeController.edit);
app.delete("/api/grade/:id", GradeController.delete);

//Start Server
const start = async () => {
  await dataSource.initialize();
  app.listen(5000, () => console.log("Server started on 5000"));
};

start();
