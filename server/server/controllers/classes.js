const Class = require("../models/classes");
const Student = require("../models/students");

exports.getAllClasses = async (req, res) => {
  try {
    const result = await Class.find();
    if (result && result.length !== 0) {
      return res.status(200).send({
        msg: "Classes found!",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Classes not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getClassById = async (req, res) => {
  try {
    const result = await Class.findById(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Class found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Class not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteClass = async (req, res) => {
  try {
    const result = await Class.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).send({
        msg: "Class deleted",
      });
    }
    res.status(500).send({ msg: "Something went wrong" });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateClass = async (req, res) => {
  try {
    const data = {
      grade: req.body.grade,
      code: req.body.code,
      main: req.body.main,
      mainCode: req.body.mainCode,
    };
    const result = await Class.findByIdAndUpdate(req.params.id, data);
    if (result) {
      return res.status(200).send({
        msg: "Class updated",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Class was not updated",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createClass = async (req, res) => {
  try {
    const data = new Class({
      grade: req.body.grade,
      code: req.body.code,
      main: req.body.main,
      mainCode: req.body.mainCode,
    });
    const result = await data.save();
    if (result) {
      return res.status(201).send({
        msg: "Class created",
        payload: result,
      });
    }
    res.status(500).send({
      msg: "Class was not created",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getAllStudentNamesInClass = async (req, res) => {
  try {
    const result = await Student.find({ grade: {
      _id: req.params.id
    } }).select("name");
    if (result) {
      return res.status(200).send({
        msg: "Students found",
        payload: result,
      });
    }
    res.status(404).send({ msg: "Students not found" });
  } catch (error) {
    res.status(500).send(error);
  }
};