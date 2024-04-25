const usersRepository = require('./users-repository');
const { errorResponder, errorTypes } = require('../../../core/errors');
const { hashPassword, passwordMatched } = require('../../../utils/password');

async function createUser(name, email, password, telephone_no, access_code, digiBank_pin) {
    try {
        // Hash password
        const hashedPassword = await hashPassword(password);
        
        // Create user
        await usersRepository.createUser(name, email, hashedPassword, telephone_no, access_code, digiBank_pin);
        
        return true; // Return true if user creation is successful
    } catch (error) {
        // Handle error
        throw error; // Throw error to be handled by caller
    }
}

async function checkPassword(userId, password) {
    const user = await usersRepository.getUser(userId);
    return passwordMatched(password, user.password);
}

async function emailIsRegistered(email) {
    const user = await usersRepository.getUserByEmail(email);
    return !!user; // Return true if user with email is found, false otherwise
}

module.exports = {
    createUser,
    checkPassword,
    emailIsRegistered,
};
