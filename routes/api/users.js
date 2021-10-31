const express = require("express")

const { controllerWrapper, validation, authenticate, upload } = require("../../middlewares")
const { joiSchema } = require("../../models/user")
const { auth: ctrlAuth } = require("../../controllers")
const { users: ctrlUsers } = require("../../controllers")

const router = express.Router()


router.post("/signup", validation(joiSchema), controllerWrapper(ctrlAuth.register))


router.post("/login", validation(joiSchema), controllerWrapper(ctrlAuth.login))


router.get("/logout", authenticate, controllerWrapper(ctrlAuth.logout))


router.get("/current", authenticate, controllerWrapper(ctrlUsers.getCurrentUser))


router.patch("/", authenticate, controllerWrapper(ctrlUsers.updateSubscription))


router.patch("/avatars", authenticate, upload.single("avatar"), controllerWrapper(ctrlUsers.updateAvatar))


module.exports = router