const dataSource = require("../utils").dataSource;
const Grade = require("../entity/Grade");
const Skill = require("../entity/Skill");
const Wilder = require("../entity/Wilder");

class GradeController {
  static async create(req, res) {
    const { grade } = req.body;
    const { wilderId, skillId } = req.params;

    const wilder = await dataSource.getRepository(Wilder).findOneBy({
      id: wilderId,
    });

    if (!wilder) {
      res.status(404).send("Wilder not found");
      return;
    }

    const skill = await dataSource.getRepository(Skill).findOneBy({
      id: skillId,
    });

    if (!skill) {
      res.status(404).send("Skill not found");
      return;
    }

    const existingGrade = await dataSource.getRepository(Grade).find({
      where: { wilder, skill },
    });
    console.log(existingGrade);
    if (existingGrade.length > 0) {
      res.status(409).send("Grade already exists");
      return;
    }

    try {
      await dataSource.getRepository(Grade).save({
        grade,
        wilder,
        skill,
      });
      res.send("Created grade");
    } catch (error) {
      console.log(error);
      res.status(500).send("Error while creating grade");
    }
  }
  static async read(req, res) {
    try {
      const retour = await dataSource.getRepository(Grade).find();
      res.send(retour);
    } catch (error) {
      res.send("Error reading Grade");
    }
  }

  static async edit(req, res) {
    const { id } = req.params;
    const existingGrade = await dataSource.getRepository(Grade).findOneBy({
      id,
    });
    if (existingGrade === null) {
      return res.status(404).send("Grade not found");
    }
    try {
      await dataSource.getRepository(Grade).update(id, req.body);
      res.send("Updated Grade");
    } catch (error) {
      res.send("Error while updating Grade");
    }
  }

  static async delete(req, res) {
    const { id } = req.params;
    const existingGrade = await dataSource.getRepository(Grade).findOneBy({
      id,
    });
    if (existingGrade === null) {
      return res.status(404).send("Grade not found");
    }
    try {
      await dataSource.getRepository(Grade).delete(id);
      res.send("Deleted Grade");
    } catch (error) {
      res.send("Error while deleting Grade");
    }
  }
}

module.exports = GradeController;
