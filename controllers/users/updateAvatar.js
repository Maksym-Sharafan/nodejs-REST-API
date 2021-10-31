const path = require("path")
const fs = require("fs/promises")
var Jimp = require('jimp')

const { User } = require("../../models")

const updateAvatar = async (req, res) => {
    const { _id } = req.user
    const { path: tempDir, originalname } = req.file
    const [extension] = originalname.split(".").reverse()
    const filename = `${_id}.${extension}`
    const uploadDir = path.join(__dirname, "../../", "public\\avatars", filename)

    Jimp.read(tempDir, (err, avatar) => {
        if (err) throw err
        avatar
            .resize(250, 250)
            .quality(60)
            .greyscale()
            .write(uploadDir)
    })

    try {
        const image = path.join("avatars", filename)
        await User.findByIdAndUpdate(_id, { avatarURL: image })
        res.json({
            status: "success",
            code: 201,
            data: {
                image
            }
        })
    } catch (error) {
        await fs.unlink(tempDir)
        next(error)
    }
}

module.exports = updateAvatar