const fs = require('fs/promises')
const path = require('path')

const contactsPath = path.join(__dirname, 'contacts.json')

const listContacts = async () => {
    const allContacts = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(allContacts);
}

module.exports = listContacts