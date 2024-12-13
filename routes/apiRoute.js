const express = require("express");
const apiRoute = express.Router();
const apiController = require("../controllers/apiController");

// routes needed:
// [v] view to write in Tasks, list Tasks and delete them if needed
// [v] get me a random task (except the taskIds served in the request body)
// [v] create tasks on the frontend first (make circle not 100% opaque)
// [v] fast way to create tasks on the backend in bulk?
// [v] create a new tasks route
// [v] create the Ukai task
// [v] fix the bug of same tasks appearing
// [v] view to update / change tasks
// [v] fix the location of ardester task
// [v] make it possible to put more than one task in one spot: winTexts being opaque AND pointer-none!
// [v] add tasks that still reference trowulan begnion etc
// [v] game completed if no tasks
// [v] tell me if my high score is top 5 or not (auto yes if less then 5 scores)
// [v] post to update the top 5 scores if yes (frontend should then show a form to write in your username)
// [v] bug: keys of the high scores
// [v] bug: incorrect testing if it is the high score
// [_] incorporate react-zoom-pan-pinch

apiRoute.post("/log-in", apiController.postAdminLogIn);
apiRoute.get("/create_tasks", apiController.getAdminPage);
apiRoute.post("/delete_task/:task_id", apiController.postDeleteTask);
apiRoute.post("/random_task", apiController.postRandomTask);
apiRoute.post("/new_task", apiController.postNewTask);
apiRoute.get("/update_task/:task_id", apiController.getUpdateTasks);
apiRoute.post("/update_task/:task_id", apiController.postUpdateTasks);
apiRoute.post("/is_it_high_score", apiController.postCheckIfHighScore);
apiRoute.get("/top_five", apiController.getTopFiveHighScores);
apiRoute.post("/new_high_score", apiController.postNewHighScore);

module.exports = apiRoute;
