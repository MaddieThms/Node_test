const express = require("express");
const SkillController = require("./controllers/SkillController");
const dataSource = require("./utils").dataSource;
const WilderController = require("./controllers/WilderController");

const app = express();

app.use(express.json())



app.use((req, res, next) => {
  const requestNb = Math.floor(Math.random()*3)+1
  if (requestNb < 3) {
    res.status(418).send("I'm a Teapot");
    console.log(`${req.ip} ${req.method} ${req.url}`);
    return;
  }
  next();
})


app.get("/api/wilder", WilderController.read);
app.post("/api/wilder", WilderController.create);
app.put("/api/wilder/:id", WilderController.edit);
app.delete("/api/wilder/:id", WilderController.delete);
app.post("/api/wilderwithskills", WilderController.addSkill)

app.get("/api/skill", SkillController.read);
app.post("/api/skill", SkillController.create);
app.put("/api/skill/:id", SkillController.edit);
app.delete("/api/skill/:id", SkillController.delete);


//Start Server
const start = async () => {
  await dataSource.initialize();
  app.listen(3000, () => console.log("Server started on 3000"));
}

start();