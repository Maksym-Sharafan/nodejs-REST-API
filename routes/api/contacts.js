const express = require("express")

const { controllerWrapper, validation, authenticate } = require("../../middlewares")
const { joiSchema } = require("../../models/contact")
const { contacts: ctrl } = require("../../controllers")

const router = express.Router()

router.get("/", authenticate, controllerWrapper(ctrl.getAll))

router.get("/:id", authenticate, controllerWrapper(ctrl.getById))

router.post("/", authenticate, validation(joiSchema), controllerWrapper(ctrl.add))

router.put("/:id", authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch("/:id/favorite", authenticate, controllerWrapper(ctrl.updateFavorite))

router.delete("/:id", authenticate, controllerWrapper(ctrl.removeById))

module.exports = router