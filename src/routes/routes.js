const {Router} = require("express");
const controller = require('../controllers/controller');

const router = Router();

router.get("/", controller.getBooks);
router.post("/", controller.addBook);
router.get("/:id", controller.getBooksById);
router.put("/:id", controller.updateBook);
router.delete("/:id", controller.removeBook);


module.exports = router; 