const { Conflict } = require("http-errors")
const gravatar = require('gravatar')
const { v4 } = require('uuid');

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const { User } = require("../../models")
const { sendEmail } = require("../../helpers")

const register = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        throw new Conflict("Email in use")
    }

    const avatarURL = gravatar.url(email)
    const verifyToken = v4()
    const newUser = new User({
        email,
        avatarURL,
        verifyToken
    })

    newUser.setPassword(password)
    await newUser.save()

    const mail = {
        to: email,
        subject: "Подтверждение регистрации на сайте",
        text: "Подтверждение регистрации на сайте",
        html: `
        <a target="_blank" 
            href="http://localhost:3000/api/users/verify/${verifyToken}">Нажмите для подтверждения email</a>
        `
    }

    sendEmail(mail)

    res.status(201).json({
        status: "success",
        code: 201,
        message: "Register success"
    })
}

module.exports = register