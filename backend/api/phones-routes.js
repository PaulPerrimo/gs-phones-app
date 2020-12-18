const { Router } = require("express");

const { check } = require("express-validator");

const fileUpload = require("../middleware/file-upload");

const checks = [
  check("name").not().isEmpty(),
  check("name").isLength({ min: 2 }),
  check("manufacturer").not().isEmpty(),
  check("manufacturer").isLength({ min: 2 }),
  check("description").not().isEmpty(),
  check("color").not().isEmpty(),
  check("price").not().isEmpty(),
  check("price").isNumeric(),
  check("screen").not().isEmpty(),
  check("processor").not().isEmpty(),
  check("ram").not().isEmpty(),
  check("ram").isNumeric(),
];

const phonesController = require("../controllers/phones-controller");

const router = Router();

router.get("/:pid", phonesController.getPhoneById);

router.get("/", phonesController.getPhones);

router.post("/", fileUpload.single("img"), checks, phonesController.createPhone);

router.patch("/:pid", checks, phonesController.updatePhone);

router.delete("/:pid", phonesController.deletePhone);

module.exports = router;
