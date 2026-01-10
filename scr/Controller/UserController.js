const userService = require("../service/userService");

const userController = {
  async load(req, res) {
    try {
      const users = await userService.load();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;