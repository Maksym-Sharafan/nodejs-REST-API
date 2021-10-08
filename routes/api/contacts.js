const express = require("express")

const { controllerWrapper, validation } = require("../../middlewares")
const { joiSchema } = require("../../models/contact")
const { contacts: ctrl } = require("../../controllers")

const router = express.Router()

router.get("/", controllerWrapper(ctrl.getAll))

router.get("/:id", controllerWrapper(ctrl.getById))

router.post("/", validation(joiSchema), controllerWrapper(ctrl.add))

router.put("/:id", validation(joiSchema), controllerWrapper(ctrl.updateById))

router.patch("/:id/favorite", controllerWrapper(ctrl.updateFavorite))

router.delete("/:id", controllerWrapper(ctrl.removeById))

module.exports = router