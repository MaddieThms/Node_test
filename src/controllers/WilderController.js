const dataSource = require("../utils").dataSource;
const Wilder = require("../entity/Wilder");
const Skill = require("../entity/Skill");

class WilderController{

    static async create(req,res){
        try{ await dataSource.getRepository(Wilder).save(req.body);
            res.send("Created Wilder");
        }catch(error){
            if (error.code === "SQLITE_CONSTRAINT") {
                return res.status(409).send("A wilder with this email already exists");
              }
              return res.status(400).send("Something went wrong");
        }
    };
    static async read(req,res){
        try{ const retour = await dataSource.getRepository(Wilder).find();
            res.send(retour);
               }catch(error){
                   res.send("Error reading wilder")
               }
           };
    
     static async edit(req,res){
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
             };

     static async delete(req,res){
         
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
        };
    
    static async addSkill(req, res) {
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

module.exports = WilderController;





