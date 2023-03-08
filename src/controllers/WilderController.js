const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

module.exports={
read : async (req,res) => {
 try{ const retour = await dataSource.getRepository(Wilder).find();
     res.send(retour);
        }catch(error){
            res.send("Error reading wilder")
        }
    },
create : async (req,res) => {
    try{ await dataSource.getRepository(Wilder).save(req.body);
        res.send("Created Wilder");
    }catch(error){
        res.send("Error while creating wilder")
    }
},

edit: async (req,res) => {
    const {id} =req.params;
    const existingWilder = await dataSource.getRepository(Wilder).findOneBy({
        id,
      });
      if (existingWilder === null) {
        return res.status(404).send("Wilder not found");
      }
    try{ await dataSource.getRepository(Wilder).update(id, req.body);
        res.send("Updated Wilder");
    
}catch(error){
        res.send("Error while updating wilder");
    }
},
delete: async (req,res) => {
    const {id} =req.params;
    const existingWilder = await dataSource.getRepository(Wilder).findOneBy({
        id,
      });
      if (existingWilder === null) {
        return res.status(404).send("Wilder not found");
      }
    try{ await dataSource.getRepository(Wilder).delete(id);
        res.send("Deleted Wilder");
    }catch(error){
        res.send("Error while deleting wilder")
    }
},
addSkill: async (req, res) => {
    try {
        const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({name: req.body.wilderName});
        console.log(wilderToUpdate);
        const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({name:req.body.skillName});
        wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
        await dataSource.getRepository(Wilder).save(wilderToUpdate);
        res.send("Skill added to wilder");
    } catch(err){console.log(err);
    res.send("error while adding skill to wilder");}
    }
}
