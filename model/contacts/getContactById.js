const listContacts = require("./listContacts")

const getContactById = async (id) => {
    const contactId = isNaN(id) ? id : Number(id);
    const contacts = await listContacts()
    const idx = contacts.findIndex(item => item.id === contactId)
    if (idx === -1) {
        return null;
    }
    return contacts[idx]
};

module.exports = getContactById