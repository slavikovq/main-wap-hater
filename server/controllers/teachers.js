const Teacher = require("../models/teachers");

exports.getAllTeachers = async (req, res) => {
  try {
    const result = await Teacher.find().populate("subjects");
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Teachers found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Teachers not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getTeacherById = async (req, res) => {
  try {
    const result = await Teacher.findById(req.params.id).populate("subjects");
    if (result) {
      return res.status(200).send({
        msg: "Teacher found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Teacher not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const result = await Teacher.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Teacher deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      age: req.body.age,
      contract: req.body.contract,
      subjects: req.body.subjects,
    };
    const result = await Teacher.findByIdAndUpdate(req.params.id, data, {
      new: true,
    }).populate("subjects");
    if (result) {
      return res.status(200).send({
        msg: "Teacher updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Teacher was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const data = new Teacher({
      name: req.body.name,
      age: req.body.age,
      contract: req.body.contract,
      subjects: req.body.subjects || [],
    });
    const result = await data.save();
    const populatedResult = await Teacher.findById(result._id).populate(
      "subjects"
    );
    if (result) {
      return res.status(201).send({
        msg: "Teacher created",
        payload: populatedResult,
      });
    }
    res.status(500).send({
      msg: "Teacher was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.assignSubjectToTeacher = async (req, res) => {
  try {
    const { teacherId, subjectId } = req.body;

    const result = await Teacher.findByIdAndUpdate(
      teacherId,
      { $addToSet: { subjects: subjectId } },
      { new: true }
    ).populate("subjects");

    if (result) {
      return res.status(200).send({
        msg: "Subject assigned to teacher",
        payload: result,
      });
    }

    res.status(404).send({ msg: "Teacher not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};
