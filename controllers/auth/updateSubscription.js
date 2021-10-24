const jwt = require("jsonwebtoken")
const { User } = require("../../models")

const { SECRET_KEY } = process.env

const updateSubscription = async (req, res) => {

    const { subscription } = req.body
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(" ");
    const { id } = jwt.verify(token, SECRET_KEY);

    if (!(subscription === 'starter' || subscription === 'pro' || subscription === 'business')) {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: 'Subscription must have one of the following values: starter, pro, business',
            data: 'Bad request',
        })
        return
    }

    const result = await User.findByIdAndUpdate(id, { subscription }, { new: true })

    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

module.exports = updateSubscription