const jwt = require("jsonwebtoken")

const { User } = require("../../models")

const { SECRET_KEY } = process.env

const getCurrentUser = async (req, res) => {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(" ")
    const { id } = jwt.verify(token, SECRET_KEY)
    const { email, subscription } = await User.findById(id)

    res.json({
        status: "OK",
        code: 200,
        data: {
            email: email,
            subscription: subscription
        }
    })
}

module.exports = getCurrentUser