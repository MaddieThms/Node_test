const express = require("express");
const typeorm = require("typeorm")
const Wilder = require("./entity/Wilder");

const app = express();

const datasource = new typeorm.DataSource({
  type:"sqlite",
  database:"./wildersdb.sqlite",
  synchronize:true,
  entities: [require("./entity/Wilder")]
})

app.get("/", (req, res) => {
  res.send("Hello World");
});

//Start Server
const Start = async () => {
  await datasource.initialize();
  datasource.getRepository(Wilder).save({name:"First Wilder"});
  app.listen(3000, () => console.log("Server started on 3000"));
}

Start();
