const updateContact = require("./updateContact")
const listContacts = require("./listContacts")

const removeById = async (id) => {
    const contactId = isNaN(id) ? id : Number(id)
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null
    }
    contacts.splice(idx, 1)
    await updateContact(contacts)
    return true
}

module.exports = removeById