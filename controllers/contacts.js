const { NotFound } = require("http-errors")

const { Contact } = require("../models")

const getAll = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const { _id } = req.user;
    const result = await Contact.find({ owner: _id },
        "_id name email phone favorite", { skip, limit: +limit }).populate("owner", "email")
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const getById = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findById(id, "_id name email phone favorite")

    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const add = async (req, res) => {
    const newContact = { ...req.body, owner: req.user._id }
    const result = await Contact.create(newContact)
    res.status(201).json({
        status: "success",
        code: 201,
        data: {
            result
        }
    })
}

const updateById = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const updateFavorite = async (req, res) => {
    const { id } = req.params
    const { favorite } = req.body

    if (!favorite) {
        res.status(400).json({
            status: 'error',
            code: 400,
            message: 'missing field favorite',
            data: 'Not Found',
        })
    }

    const result = await Contact.findByIdAndUpdate(id, { favorite }, { new: true })
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
        status: "success",
        code: 200,
        data: {
            result
        }
    })
}

const removeById = async (req, res) => {
    const { id } = req.params
    const result = await Contact.findByIdAndDelete(id)
    console.log(result)
    if (!result) {
        throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json({
        status: "success",
        code: 200,
        message: "Success delete"
    })
}

module.exports = {
    getAll,
    getById,
    add,
    updateById,
    updateFavorite,
    removeById
}