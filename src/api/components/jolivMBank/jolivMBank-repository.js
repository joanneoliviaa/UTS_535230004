const bcrypt = require('bcrypt');
const { User } = require('../../../models');

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @param {string} telephone_no - Telephone number
 * @param {string} access_code - Access code
 * @param {string} digiBank_pin - Digital bank PIN
 * @returns {Promise}
 */
async function createUser(name, email, password, telephone_no, access_code, digiBank_pin) {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    return User.create({
      name,
      email,
      password: hashedPassword,
      telephone_no,
      access_code,
      digiBank_pin,
    });
}

module.exports = {
    createUser,
};
