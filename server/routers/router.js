const router = require("express").Router();

const { authenticateToken } = require("../auth/auth");
const ArticalController = require("../controllers/artical");
const UserController = require("../controllers/user");

// *** user routers
router.post("/sign-up", UserController.sign_up);
router.post("/login", UserController.login);

//**Artical routers */

router.get("/", ArticalController.all_news);
router.post("/read-artical", authenticateToken, ArticalController.readArtical);

module.exports = router;
