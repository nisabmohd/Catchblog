const bcrypt = require("bcrypt");

const hash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt)
}

const verify = async (hashPassword, toCheckPassword) => {
    return await bcrypt.compare(toCheckPassword, hashPassword);
}

module.exports = { hash, verify }