module.exports = app => {
  const controller = require("../controllers/answers.controller.js");
  app.post("/api/answers", controller.create);
  app.get("/api/answers", controller.findAll);
  app.get("/api/answers/:answerId", controller.findOne);
  app.put("/api/answers/:answerId", controller.update);
  app.delete("/api/answers/:answerId", controller.delete);
};
