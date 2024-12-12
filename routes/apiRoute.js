const express = require("express");
const apiRoute = express.Router();
const apiController = require("../controllers/apiController");

// routes needed:
// - view to write in Tasks, list Tasks and delete them if needed
// - get me a random task (except the taskIds served in the request body)
// - test every task in debug on the frontend (where the tasks circles are not 100% opaque)
// - tell me if my high score is top 5 or not (auto yes if less then 5 scores)
// - post to update the top 5 scores if yes (frontend should then show a form to write in your username)

apiRoute.post("/log-in", apiController.postAdminLogIn);
apiRoute.get("/create_tasks", apiController.getAdminPage);
apiRoute.post("delete_task/:task_id", apiController.postDeleteTask);

module.exports = apiRoute;
