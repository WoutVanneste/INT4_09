module.exports = app => {
  const controller = require("../controllers/answers.controller.js");
  app.post("/api/answers", controller.create);
  app.post("/api/answers/:answerId", controller.append);
  app.get("/api/answers", controller.findAll);
  app.get("/api/answers/:answerId", controller.findOne);
  app.put("/api/answers/:answerId", controller.update);
  app.patch("/api/answers/:answerId", controller.update);
  app.delete("/api/answers/:answerId", controller.delete);
};
