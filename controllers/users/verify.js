const { NotFound } = require("http-errors")

const { User } = require("../../models")

const verify = async (req, res) => {
    const { verifyCode } = req.params
    const user = await User.findOne({ verifyToken: verifyCode })

    if (!user) {
        throw NotFound()
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verifyToken: "" })

    res.json({
        status: "success",
        code: 200,
        message: "Verification successful"
    })
}

module.exports = verify