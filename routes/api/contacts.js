const express = require("express")
const { NotFound, BadRequest } = require("http-errors")
const Joi = require("joi")

const contactsOperations = require("../../model/contacts")

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
})

const router = express.Router()

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts
      }
    })
  }
  catch (error) {
    next(error)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contactsOperations.getContactById(id)
    if (!contact) {
      throw new NotFound(`Contact with id=${id} not found`)
    }
    res.json(contact)
  }
  catch (error) {
    next(error)
  }
})

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const result = await contactsOperations.addContact(req.body)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  }
  catch (error) {
    next(error)
  }
})

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw new BadRequest(error.message)
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContactById(id, req.body)
    if (!result) {
      throw new NotFound(`Product with id=${id} not found`)
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  }
  catch (error) {
    next(error)
  }
})

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contactsOperations.removeContact(id)
    if (!result) {
      throw new NotFound(`Product with id=${id} not found`)
    }
    res.json({
      status: "success",
      code: 200,
      message: "Success delete"
    })
  }
  catch (error) {
    next(error)
  }
})

module.exports = router