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

module.exports = { postAdminLogIn, getAdminPage, postDeleteTask };
