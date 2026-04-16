var express = require("express");
var router = express.Router();

const teachersController = require("../controllers/teachers");

router.get("/", teachersController.getAllTeachers);

//localhost:3000/teachers/5sa4d949qw86d5sa4d6sa
//req.params.id

router.get("/:id", teachersController.getTeacherById);

router.delete("/:id", teachersController.deleteTeacher);

router.put("/:id", teachersController.updateTeacher);

router.post("/", teachersController.createTeacher);

router.post("/assign-subject", teachersController.assignSubjectToTeacher)

module.exports = router;
