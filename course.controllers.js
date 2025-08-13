const courseModel = require('../Models/course.model');

const courseControllers = async (req, res) => {
  const courseData = req.body;
  const storedata = new courseModel(courseData);
  await storedata.save();
  res.status(201).send("course data stored");
};

module.exports = {
  courseControllers
};
