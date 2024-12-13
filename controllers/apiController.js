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
    res.render("create_tasks");
  } catch (err) {
    return next(err);
  }
};

const getUpdateTasks = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.task_id);
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });
    if (!task) {
      return res.status(404).send("Task not found");
    }
    res.render("update_task", { task });
  } catch (err) {
    return next(err);
  }
};

const postUpdateTasks = async (req, res, next) => {
  try {
    const taskId = parseInt(req.params.task_id);
    const updatedData = {
      text: req.body.text,
      winText: req.body.winText,
      coordX: parseFloat(req.body.coordX),
      coordY: parseFloat(req.body.coordY),
      radius: parseInt(req.body.radius),
    };
    await prisma.task.update({
      where: { id: taskId },
      data: updatedData,
    });
    res.render("create_tasks");
  } catch (err) {
    return next(err);
  }
};

const postCheckIfHighScore = async (req, res, next) => {
  try {
    const allScores = await prisma.score.findMany({
      orderBy: {
        value: "desc",
      },
    });
    // check if there are more than 5 scores
    if (allScores.length > 4) {
      const playerScore = parseInt(req.body.playerScore);
      if (playerScore > allScores[4]) {
        return res.status(200).json(true);
      } else {
        return res.status(200).json(false);
      }
    } else {
      return res.status(200).json(true);
    }
  } catch (err) {
    return next(err);
  }
};

const getTopFiveHighScores = async (req, res, next) => {
  try {
    const topFiveScores = await prisma.score.findMany({
      orderBy: {
        value: "desc", // Sort by score value in descending order
      },
      take: 5, // Limit the query to the top 5 scores
    });
    return res.status(200).json(topFiveScores);
  } catch (err) {
    return next(err); // Pass errors to the error handler
  }
};

const postNewHighScore = async (req, res, next) => {
  try {
    const playerName = req.body.playerName;
    const playerScore = parseInt(req.body.value);
    const newHS = await prisma.score.create({
      data: {
        playerName: playerName,
        value: playerScore,
      },
    });
    return res
      .status(200)
      .json({ message: "successfully posted a new high score" });
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
  getUpdateTasks,
  postUpdateTasks,
  postCheckIfHighScore,
  getTopFiveHighScores,
  postNewHighScore,
};
