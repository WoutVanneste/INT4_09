module.exports = app => {
  const controller = require("../controllers/questions.controller.js");
  app.post("/api/questions", controller.create);
  app.get("/api/questions", controller.findAll);
  app.get("/api/questions/:questionId", controller.findOne);
  app.put("/api/questions/:questionId", controller.update);
  app.delete("/api/questions/:questionId", controller.delete);
};
