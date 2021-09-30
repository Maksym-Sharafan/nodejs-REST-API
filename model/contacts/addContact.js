const { v4 } = require('uuid')

const updateContact = require('./updateContact')
const listContacts = require('./listContacts')

const addContact = async ({ name, email, phone }) => {
    const contacts = await listContacts()
    const newContact = {
        id: v4(),
        name,
        email,
        phone
    }
    contacts.push(newContact)

    await updateContact(contacts)

    return newContact
}

module.exports = addContact
