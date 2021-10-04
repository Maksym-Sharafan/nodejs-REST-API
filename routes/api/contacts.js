const express = require("express")

const ctrl = require("../../controllers")
const { validation } = require("../../middlewares/validation")
const { joiSchema } = require("../../service/schemas/joiSchema")

const router = express.Router()

router.get("/", ctrl.get)

router.get("/:id", ctrl.getById)

router.post("/", validation(joiSchema), ctrl.create)

router.put("/:id", validation(joiSchema), ctrl.update)

router.patch("/:id/favorite", validation(joiSchema), ctrl.updateStatusContact)

router.delete("/:id", ctrl.remove)

module.exports = router