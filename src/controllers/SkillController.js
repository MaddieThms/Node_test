const dataSource = require("../utils").dataSource;
const Skill = require("../entity/Skill");

module.exports={
    read : async (req,res) => {
        try{ const skills= await dataSource.getRepository(Skill).find();
            res.send(skills)
       }catch(error){
            res.send("Error reading Skill")
        }
    },
create : async (req,res) => {
    try{ await dataSource.getRepository(Skill).save(req.body);
        res.send("Created Skill")
    }catch(error){
        if (error.code === "SQLITE_CONSTRAINT") {
            return res.status(409).send("Skill already exists");
          }
          return res.status(400).send("Something went wrong");
    }
},

edit: async (req,res) => {
    const { id } = req.params;
    const existingSkill = await dataSource.getRepository(Skill).findOneBy({id});
          if (existingSkill === null) {
            return res.status(404).send("Skill not found");
          }
    try{ await dataSource.getRepository(Skill).update(id, req.body)
        res.send("Updated Skill")
    
}catch(error){
        res.send("Error while updating Skill")
    }
},
delete: async (req,res) => {
    const { id } = req.params;
    const existingSkill = await dataSource.getRepository(Skill).findOneBy({id});
          if (existingSkill === null) {
            return res.status(404).send("Skill not found");
          }
    try{ await dataSource.getRepository(Skill).delete(id)
        res.send("Deleted Skill")
    }catch(error){
        res.send("Error while deleting Skill")
    }
},
}