const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const postAdminLogIn = async (req, res, next) => {
  try {
    if (req.body.username === process.env.ADMIN_USERNAME) {
      if (req.body.password === process.env.ADMIN_PASSWORD) {
        const admin = { adminRights: "granted" };
        const allTasks = await prisma.task.findMany();
        res.render("create_tasks", { admin: admin, tasks: allTasks });
      }
    }
  } catch (err) {
    return next(err);
  }
};

const getAdminPage = async (req, res, next) => {
  res.render("create_tasks", { admin: null });
};

const postDeleteTask = async (req, res, next) => {
  try {
    const task_id = parseInt(req.params.task_id);
    await prisma.task.delete({
      where: {
        id: task_id,
      },
    });
    res.render("create_tasks");
  } catch (err) {
    return next(err);
  }
};

const postRandomTask = async (req, res, next) => {
  console.log("Received a random task request:");
  console.log(req.body);
  try {
    getRandomInt = (max) => {
      return Math.floor(Math.random() * max);
    };
    const completedTasks = req.body.completedTasks;
    if (!Array.isArray(completedTasks)) {
      return res
        .status(400)
        .json({ message: "completedTasks must be an array" });
    }
    const allTasks = await prisma.task.findMany();
    const filteredTasks = allTasks.filter(
      (i) => !completedTasks.includes(i.id)
    );
    if (filteredTasks.length === 0) {
      return res.status(404).json({ message: "No tasks available" });
    }
    const randomTask = filteredTasks[getRandomInt(filteredTasks.length)];
    return res.status(200).json(randomTask);
  } catch (err) {
    return next(err);
  }
};

const postNewTask = async (req, res, next) => {
  try {
    await prisma.task.create({
      data: {
        text: req.body.text,
        winText: req.body.winText,
        coordX: parseFloat(req.body.coordX),
        coordY: parseFloat(req.body.coordY),
        radius: parseInt(req.body.radius),
      },
    });
    return res.status(200);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  postAdminLogIn,
  getAdminPage,
  postDeleteTask,
  postRandomTask,
  postNewTask,
};
